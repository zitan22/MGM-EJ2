import {
  TreeGrid,
  Toolbar,
  Edit,
  Sort,
  Filter,
  Selection,
  Page,
  Resize,
  Reorder,
  RowDD,
  CommandColumn,
  ContextMenu,
  ITreeData
} from '@syncfusion/ej2-treegrid';
import {
  QueryCellInfoEventArgs,
  RowDataBoundEventArgs,
  RowSelectEventArgs,
} from '@syncfusion/ej2-grids';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

import { Data } from './datasource';


let selectedRecord: any;
let copiedRecord: any;

TreeGrid.Inject(
  Toolbar,
  Edit,
  Sort,
  Filter,
  Selection,
  Page,
  Resize,
  Reorder,
  RowDD,
  CommandColumn,
  ContextMenu
);
let menuItems: Object[] = [
  'AddRow',
  'Edit',
  'Delete',
  {
    separator: true
  },
  {
    text: 'Copy', id: 'copy'
  },
  {
    text: 'Cut', id: 'cut'
  },

  {
    text: 'Paste',
    items: [
      {
        text: 'Above', id: 'above'
      },
      {
        text: 'Below', id: 'below'
      },
      {
        text: 'Child', id: 'child'
      }
    ]
  }
];
let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: Data,

  childMapping: 'subtasks',

  toolbar: ['Add', 'Delete', 'Update', 'Cancel'],

  editSettings: {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: 'Row',
    showDeleteConfirmDialog: true,
    newRowPosition: 'Above'
  },

  allowSorting: true,

  allowFiltering: true,
  filterSettings: {
    type: 'FilterBar',
    hierarchyMode: 'Parent',
    mode: 'Immediate'
  },

  selectionSettings: {
    type: 'Multiple',
    cellSelectionMode: 'Box',
    mode: 'Both'
  },

  allowPaging: true,
  pageSettings: { pageSize: 15 },

  allowResizing: true,

  allowReordering: true,

  allowRowDragAndDrop: true,

  contextMenuItems: menuItems,
  contextMenuClick: function (args) {
    if (args.item.id === 'copy') {
        copiedRecord = selectedRecord;
    }
    if (args.item.id === 'cut') {
        copiedRecord = selectedRecord;
        treeGridObj.editSettings.showDeleteConfirmDialog = false;
        treeGridObj.deleteRecord(copiedRecord);
  }
    if (args.item.id === 'above') {
        treeGridObj.addRecord(copiedRecord, selectedRecord.index, 'Above');
        if(this.hasChildRecords) {
            addChildRecords(copiedRecord, copiedRecord.index + 1);
        }
  
    }
    if (args.item.id === 'below') {
      treeGridObj.addRecord(copiedRecord, selectedRecord.index, 'Below');
      if(this.hasChildRecords) {
          addChildRecords(copiedRecord, copiedRecord.index + 1);
      }

  }
  if (args.item.id === 'child') {
    treeGridObj.addRecord(copiedRecord, selectedRecord.index, 'Child');
    if(this.hasChildRecords) {
        addChildRecords(copiedRecord, copiedRecord.index + 1);
    }

}
},


  treeColumnIndex: 1,

  columns: [
    {
      field: 'taskID',
      headerText: 'Task ID',
      isPrimaryKey: true,
      textAlign: 'Right',
      validationRules: { required: true, number: true },
      width: 90
    },
    {
      field: 'taskName',
      headerText: 'Task Name',
      editType: 'stringedit',
      width: 220,
      validationRules: { required: true }
    },
    {
      field: 'startDate',
      headerText: 'Start Date',
      textAlign: 'Right',
      width: 130,
      editType: 'datepickeredit',
      format: 'yMd',
      validationRules: { date: true }
    },
    {
      field: 'duration',
      headerText: 'Duration',
      width: 80,
      textAlign: 'Right'
    }
  ],
  rowSelected: rowSelected
});

treeGridObj.appendTo('#TreeGrid');

let dropDownColumns: DropDownList = new DropDownList({
  dataSource: [
    { id: 'CellEditing', name: 'Cell Editing' },
    { id: 'RowEditing', name: 'Row Editing' }
  ],
  fields: { text: 'name', value: 'id' },
  value: 'CellEditing',
  width: 120,
  change: (e: ChangeEventArgs) => {
    if (e.value === 'CellEditing') {
      treeGridObj.editSettings.mode = 'Cell';
      treeGridObj.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
    } else {
      treeGridObj.editSettings.mode = 'Row';
      treeGridObj.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    }
  }
});

dropDownColumns.appendTo('#editmodes');

function rowDataBound(args: RowDataBoundEventArgs) {
  if (!(args.data as ITreeData).hasChildRecords) {
    //responsible for the rows attributes
    (args.row as HTMLElement).style.backgroundColor = '#008cff';
    (args.row as HTMLElement).style.fontFamily = 'serif';
  }
}
function queryCellInfo(args: QueryCellInfoEventArgs) {
  if (!(args.data as ITreeData).hasChildRecords) {
    if ((args.cell as HTMLElement).classList.contains('e-unboundcell')) {
      ((args.cell as HTMLElement).querySelector(
        '.e-unboundcelldiv'
      ) as HTMLElement).style.display = 'none';
    }
  }
}

function rowSelected(args: RowSelectEventArgs): void {
  selectedRecord = args.data;
}


function addChildRecords(record: any, index: any) {
  for(var i=0; i<record.childRecords.length; i++) {
        var childRecord = record.childRecords[i];
        childRecord.taskData.TaskID = treeGridObj.getCurrentViewRecords.length + 1;
        treeGridObj.addRecord(childRecord.taskData, index, 'Child');
        if(childRecord.hasChildRecords) {
            addChildRecords(childRecord, index + (i+1));
        }
  }
}