export const registerHandlebarsHelpers = _ => {
  Handlebars.registerHelper('getHpMax', flags => {
    console.debug('Fate\'s Heir Character Sheet | getHpMax(' + flags + ')', flags);
    return 8 + flags.level * (2 + Object.entries(flags).filter(key => String(key).startsWith('power-name-')).map(power => power[1]).includes('Endurance'));
  });

  Handlebars.registerHelper('getStyle', skillOrPower => {
    console.debug('Fate\'s Heir Character Sheet | getStyle(' + skillOrPower + ')');
    return skillOrPower ? '' : ' cursor: default; pointer-events: none;';
  });

  Handlebars.registerHelper('getWarning', invocation => {
    if (invocation < 1) {
      return '<p class="notes">' + game.i18n.localize('FHCS.Warning') + '</p>';
    }
    return;
  });

  Handlebars.registerHelper('isNotBackpacks', label => {
    return label !== 'TYPES.Item.backpackPl';
  });

  Handlebars.registerHelper('isPowerAvailable', (flags, powerName) => {
    // console.log(flags)
    // console.log(powerName)
    // return !Object.entries(flags).filter(key => String(key).startsWith('power-name-')).map(power => power[1]).includes(powerName)
  });
}
