/*  IMPORTS
 */

import { FatesHeirCharacterSheet } from './module/applications/actor/character-sheet.js';
import { registerHandlebarsHelpers } from './module/utils.js';

/*  MAIN
 */

Hooks.once('init', _ => {
  Actors.registerSheet('dnd5e', FatesHeirCharacterSheet, {
    makeDefault: true,
    types: ["character", "npc"]
  });

  loadTemplates({
    'fates-heir-character-sheet.character-sheet':         'modules/fates-heir-character-sheet/templates/actors/character-sheet.hbs',
    'fates-heir-character-sheet.d100-roll-dialog':        'modules/fates-heir-character-sheet/templates/chat/d100-roll-dialog.hbs',
    'fates-heir-character-sheet.spellbook':               'modules/fates-heir-character-sheet/templates/actors/parts/actor-spellbook.hbs',
    'fates-heir-character-sheet.journal':                 'modules/fates-heir-character-sheet/templates/actors/parts/actor-journal.hbs',
    'fates-heir-character-sheet.rest':                    'modules/fates-heir-character-sheet/templates/apps/rest.hbs',
    'fates-heir-character-sheet.initiative-roll-dialog':  'modules/fates-heir-character-sheet/templates/chat/initiative-roll-dialog.hbs',
    'fates-heir-character-sheet.inventory':               'modules/fates-heir-character-sheet/templates/actors/parts/actor-inventory.hbs',
    'fates-heir-character-sheet.skill':                   'modules/fates-heir-character-sheet/templates/actors/parts/actor-skill.hbs',
    'fates-heir-character-sheet.skill-roll-dialog':       'modules/fates-heir-character-sheet/templates/chat/skill-roll-dialog.hbs',
    'fates-heir-character-sheet.power':                   'modules/fates-heir-character-sheet/templates/actors/parts/actor-power.hbs',
    'fates-heir-character-sheet.power-roll-dialog':       'modules/fates-heir-character-sheet/templates/chat/power-roll-dialog.hbs',
    'fates-heir-character-sheet.spell-roll-dialog':       'modules/fates-heir-character-sheet/templates/chat/spell-roll-dialog.hbs'
  });

  registerHandlebarsHelpers();
});
