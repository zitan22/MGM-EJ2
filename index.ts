import { TreeGrid, Filter, Page, Resize, Toolbar, Edit, CommandColumn, Selection, ContextMenu, Sort, Reorder, QueryCellInfoEventArgs, RowDD } from '@syncfusion/ej2-treegrid';
import { QueryCellInfoEventArgs, RowDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { sampleData } from './datasource.ts';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

TreeGrid.Inject( Page, Filter, Toolbar, Edit, Resize, CommandColumn, Selection, ContextMenu, Sort, Reorder, RowDD );

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  childMapping: 'subtasks',
  selectionSettings: { type: 'Multiple', cellSelectionMode: 'Both' },
  allowSorting: true,
  treeColumnIndex: 1,
  allowReordering: true,
  allowResizing: true,
  allowRowDragAndDrop: true,
  allowPaging: true,
  allowFiltering: true,
  filterSettings: {
    type: 'FilterBar',
    hierarchyMode: 'Parent',
    mode: 'Immediate'
  },

  pageSettings: { pageSize: 15 },

  editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Row', showDeleteConfirmDialog: 'true', newRowPosition: 'Above' },

  contextMenuItems: [ 'SortAscending', 'SortDescending', 'Edit', 'Delete', 'Save', 'Cancel', 'FirstPage', 'PrevPage', 'LastPage', 'NextPage' ],

  toolbar: ['Add', 'Delete', 'Update', 'Cancel'],

  columns: [
    {
      field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right', validationRules: { required: true, number: true }, width: 90
    },
    {
      field: 'taskName', headerText: 'Task Name', editType: 'stringedit', width: 220, validationRules: { required: true }
    },
    {
      field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 130, editType: 'datepickeredit', format: 'yMd', validationRules: { date: true }
    },
    {
     field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right'
    }
  ]
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
      grid.editSettings.mode = 'Cell';
      grid.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
    } else {
      grid.editSettings.mode = 'Row';
      grid.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    }
  }
});

dropDownColumns.appendTo('#editmodes');


