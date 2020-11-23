
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { BootstrapManager } from './bootstrap/bootstrap-manager'
export { BootstrapManager } from './bootstrap/bootstrap-manager'

processApp2AppArgs();

try {
  const simpleContainerRequested = (window as any)['GIZA_SIMPLE_CONTAINER_REQUESTED'];
  const uriBroker = (window as any)['GIZA_ENVIRONMENT'];

  if (!simpleContainerRequested || uriBroker.toUpperCase() === 'MVD') {
    BootstrapManager.bootstrapDesktopAndInject();
  }
} catch (error) {
  console.error("ZWED5007E - Unable to bootstrap desktop!!");
  console.error(error);
}

/* Minor code duplication of StartURLManager, but Typescript gives compile problems we can't easily ignore when we import it */
function processApp2AppArgs(url?: string): void {
  const queryString = url || location.search.substr(1);
  let pluginId, windowManager;

  queryString.split('&').forEach(part => {
    const [key, value] = part.split('=').map(v => decodeURIComponent(v));
    switch (key) {
      case "pluginId":
        (window as any)['GIZA_PLUGIN_TO_BE_LOADED'] = value;
        (window as any)['GIZA_SIMPLE_CONTAINER_REQUESTED'] = true;
        (window as any)['GIZA_ENVIRONMENT'] = 'MVD';
        pluginId = value;
        break;
      case "showLogin":
        (window as any)['ZOWE_SWM_SHOW_LOGIN'] = value;
        break;
      case "windowManager":
        windowManager = value;
        break;
    }
  });

  if ((window as any)['GIZA_SIMPLE_CONTAINER_REQUESTED']) {
    if (windowManager == 'MVD' || windowManager == 'mvd') {
      console.log(`ZWED5043I - MVD standalone container requested with pluginId ${pluginId}`);
    } else {
      console.log(`ZWED5003I - Simple container requested with pluginId ${pluginId}`);
    }
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

