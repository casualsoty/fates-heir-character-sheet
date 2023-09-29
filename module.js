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

  Handlebars.registerHelper('getHpMax', level => 8 + level * 2);
  Handlebars.registerHelper('getSeparator', level => level ? '/' : '');
  Handlebars.registerHelper('getStyle', skillOrPower => skillOrPower ? '' : 'cursor: default; pointer-events: none;');

  loadTemplates({
    'fates-heir-character-sheet.character-sheet': 'modules/fates-heir-character-sheet/templates/actors/character-sheet.hbs',
    'fates-heir-character-sheet.inventory': 'modules/fates-heir-character-sheet/templates/actors/parts/inventory.hbs',
    'fates-heir-character-sheet.skill': 'modules/fates-heir-character-sheet/templates/actors/parts/skill.hbs',
    'fates-heir-character-sheet.skill-roll-dialog': 'modules/fates-heir-character-sheet/templates/chat/skill-roll-dialog.hbs',
    'fates-heir-character-sheet.power': 'modules/fates-heir-character-sheet/templates/actors/parts/power.hbs',
    'fates-heir-character-sheet.power-roll-dialog': 'modules/fates-heir-character-sheet/templates/chat/power-roll-dialog.hbs'
  });
});
