/*  IMPORTS
 */

import { FatesHeirCharacterSheet } from './module/applications/actor/character-sheet.js';
import * as utils from './module/utils.js';

/*  MAIN
 */

Hooks.once('init', _ => {
  Actors.registerSheet('dnd5e', FatesHeirCharacterSheet, {
    label: 'Fates\'s Heir Character Sheet',
    makeDefault: true,
    types: ['character', 'npc']
  });

  utils.loadHandlebarsTemplates();
  utils.registerHandlebarsHelpers();

  console.debug('Fate\'s Heir Character Sheet | Module initialized');
});
