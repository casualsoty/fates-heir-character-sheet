/*  IMPORTS
 */

import { FatesHeirCharacterSheet } from './scripts/fates-heir-character-sheet.js';
import { getHpMax } from './scripts/helpers.js';

/*  MAIN
 */

Hooks.once('init', _ => {
  Actors.registerSheet('dnd5e', FatesHeirCharacterSheet, {
    makeDefault: true,
    types: ["character"]
  });

  Handlebars.registerHelper('getHpValue', (hpValue, level) => {
    return hpValue <= getHpMax(level) ? hpValue : getHpMax(level);
  });

  Handlebars.registerHelper('getHpMax', (level) => {
    return getHpMax(level);
  });
});
