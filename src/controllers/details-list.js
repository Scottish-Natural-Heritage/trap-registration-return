import {ReturnState} from './_base.js';
import {nonTargetSpecies} from './_util.js';

const removeIndex = (array, index) => {
  const before = array.slice(0, index);
  const after = array.slice(index + 1, array.length);
  return before.concat(after);
};

const buildDetailsList = (session) => {
  const table = [];

  table.push(`
    <table class="govuk-table">
      <thead class="govuk-table__head">
        <tr class="govuk-table__row">
          <th scope="col" class="govuk-table__header">Grid Reference</th>
          <th scope="col" class="govuk-table__header">Species caught</th>
          <th scope="col" class="govuk-table__header">Number caught</th>
          <th scope="col" class="govuk-table__header">Trap type</th>
          <th scope="col" class="govuk-table__header">Comments</th>
        </tr>
      </thead>
      <tbody class="govuk-table__body">
  `);

  session.detailsList.forEach((nonTargetSpecies) => {
    table.push(`
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">${nonTargetSpecies.gridReference}</th>
        <td class="govuk-table__cell">${nonTargetSpecies.speciesCaught}</td>
        <td class="govuk-table__cell">${nonTargetSpecies.numberCaught}</td>
        <td class="govuk-table__cell">${nonTargetSpecies.trapType}</td>
        <td class="govuk-table__cell">${nonTargetSpecies.comment}</td>
      </tr>
    `);
  });

  table.push(`
      </tbody>
    </table>
  `);

  return table.join('');
};

const detailsListController = (request) => {
  request.session.nonTargetSpecies = nonTargetSpecies();
  const formKeys = Object.keys(request.body);

  const editMode = formKeys.filter((key) => key.startsWith('edit-')).length === 1;
  const deleteMode = formKeys.filter((key) => key.startsWith('delete-')).length === 1;
  const addMode = formKeys.filter((key) => key.startsWith('add')).length === 1;
  const continueMode = formKeys.filter((key) => key.startsWith('continue')).length === 1;

  if (editMode) {
    const editKeys = formKeys.filter((key) => key.startsWith('edit-'));
    const editIndex = Number.parseInt(editKeys[0].split('edit-')[1], 10);

    request.session.currentIndex = editIndex;

    request.session.currentGridReference = request.session.detailsList[editIndex].gridReference;
    request.session.currentSpeciesCaughtOption = request.session.detailsList[editIndex].speciesCaughtOption;
    if (request.session.currentSpeciesCaughtOption === 'schedule1Birds') {
      request.session.currentSpeciesCaught = request.session.detailsList[editIndex].speciesCaught;
    } else {
      request.session.currentOtherSpeciesCaught = request.session.detailsList[editIndex].speciesCaught;
    }

    request.session.currentNumberCaught = request.session.detailsList[editIndex].numberCaught;
    request.session.currentTrapType = request.session.detailsList[editIndex].trapType;
    request.session.currentComment = request.session.detailsList[editIndex].comment;

    return ReturnState.Secondary;
  }

  if (deleteMode) {
    const deleteKeys = formKeys.filter((key) => key.startsWith('delete-'));
    const deleteIndex = Number.parseInt(deleteKeys[0].split('delete-')[1], 10);

    request.session.detailsList = removeIndex(request.session.detailsList, deleteIndex);

    return ReturnState.SameAgain;
  }

  if (addMode) {
    request.session.currentIndex = -1;

    request.session.currentGridReference = '';
    request.session.currentSpeciesCaughtOption = '';
    request.session.currentSpeciesCaught = '';
    request.session.currentOtherSpeciesCaught = '';
    request.session.currentNumberCaught = '';
    request.session.currentTrapType = '';
    request.session.currentComment = '';

    return ReturnState.Secondary;
  }

  if (continueMode) {
    request.session.detailsListCountError =
      request.session.detailsList === undefined || request.session.detailsList.length === 0;

    if (request.session.detailsListCountError) {
      return ReturnState.Error;
    }

    request.session.detailsList = buildDetailsList(request.session);

    return ReturnState.Positive;
  }

  return ReturnState.Error;
};

export {detailsListController as default};
