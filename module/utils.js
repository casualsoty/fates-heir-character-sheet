export const registerHandlebarsHelpers = _ => {
  Handlebars.registerHelper('getHpMax', flags => {
    return 8 + flags.level * (2 + Object.entries(flags).filter(key => String(key).startsWith('power-name-')).map(power => power[1]).includes('Endurance'));
  });

  Handlebars.registerHelper('getSeparator', level => {
    return level ? '/' : '';
  });

  Handlebars.registerHelper('getStyle', skillOrPower => {
    return skillOrPower ? '' : 'cursor: default; pointer-events: none;';
  });

  Handlebars.registerHelper('getWarning', invocation => {
    if (invocation < 1) {
      return '<p class="notes">' + game.i18n.localize('FHCS.Warning') + '</p>';
    }
    return;
  });

  Handlebars.registerHelper('isNotBackpacks', label => {
    console.log(label)
    return label !== 'TYPES.Item.backpackPl';
  });
}
