export const registerHandlebarsHelpers = _ => {
  Handlebars.registerHelper('getHpMax', flags => {
    console.debug('Fate\'s Heir Character Sheet | getHpMax(' + flags + ')', flags);
    return 8 + flags.level * (2 + Object.entries(flags).filter(key => String(key).startsWith('power-name-')).map(power => power[1]).includes('Endurance'));
  });

  Handlebars.registerHelper('getStyle', skillOrPowerName => {
    console.debug('Fate\'s Heir Character Sheet | getStyle(' + skillOrPowerName + ')');
    return skillOrPowerName ? '' : ' cursor: default; pointer-events: none;';
  });

  Handlebars.registerHelper('getWarning', invocationCharges => {
    console.debug('Fate\'s Heir Character Sheet | getWarning(' + invocationCharges + ')');
    if (invocationCharges < 1) {
      return '<p class="notes">' + game.i18n.localize('FHCS.Warning') + '</p>';
    }
    return;
  });

  Handlebars.registerHelper('isNotBackpacks', sectionLabel => {
    console.debug('Fate\'s Heir Character Sheet | isNotBackpacks(' + sectionLabel + ')');
    return sectionLabel !== 'TYPES.Item.backpackPl';
  });
}
