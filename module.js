/*  IMPORTS
 */

import { FatesHeirCharacterSheet } from './module/applications/actor/character-sheet.js';

/*  MAIN
 */

Hooks.once('init', _ => {
  Actors.registerSheet('dnd5e', FatesHeirCharacterSheet, {
    makeDefault: true,
    types: ["character"]
  });

  Handlebars.registerHelper('getHpMax', level => {
    return 8 + level * 3;
  });

  loadTemplates({
    'fates-heir-character-sheet.character-sheet': 'modules/fates-heir-character-sheet/templates/actors/character-sheet.hbs',
    'fates-heir-character-sheet.inventory': 'modules/fates-heir-character-sheet/templates/actors/parts/inventory.hbs',
    'fates-heir-character-sheet.skill': 'modules/fates-heir-character-sheet/templates/actors/parts/skill.hbs',
    'fates-heir-character-sheet.roll-dialog': 'modules/fates-heir-character-sheet/templates/chat/roll-dialog.hbs'
  });
});
