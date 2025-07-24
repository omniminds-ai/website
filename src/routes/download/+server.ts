import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Fetch the latest.json file from GitHub
    const response = await fetch(
      'https://github.com/omniminds-ai/desktop/releases/latest/download/latest.json'
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const version = data.version;

    // Construct download URLs based on version
    const baseUrl = 'https://github.com/omniminds-ai/desktop/releases/latest/download/';

    // Return the modified data with direct download URLs
    return json({
      version: version,
      notes: data.notes,
      pub_date: data.pub_date,
      platforms: {
        // 'darwin-x86_64': {
        //   url: `${baseUrl}Viralmind.Desktop_${version}_x64.dmg`
        // },
        // 'linux-x86_64': {
        //   url: `${baseUrl}Viralmind.Desktop_${version}_amd64.deb`
        // },
        'windows-x86_64': {
          url: `https://github.com/omniminds-ai/desktop/releases/download/V0.1.6/omniminds-desktop.exe`
        },
        // 'windows-arm64': {
        //   url: `${baseUrl}Viralmind.Desktop_${version}_arm64_en-US.msi `
        // },
        'darwin-aarch64': {
          url: `https://github.com/omniminds-ai/desktop/releases/download/V0.1.6/Omniminds.Desktop_0.1.6_aarch64.dmg`
        }
      }
    });
  } catch (error) {
    console.error('Error fetching release data:', error);
    return json({
      "version": "0.1.5",
      "notes": "Download Omniminds Desktop for your operating system below.",
      "pub_date": "2025-07-03T22:13:53.079Z",
      "platforms": {
        "darwin-aarch64": {
          "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IG1pbmlzaWduIHB1YmxpYyBrZXk6IEZCNjYwQkI2OURGMDQ4NTMKUldSVFNQQ2R0Z3RtKzUzc2N6d3RtQ1V4eEV5NXo3bHVmU05wL3FrMGN2dW9hSFE4TTIzL1I5eEcK",
          "url": "https://github.com/omniminds-ai/desktop/releases/download/v0.1.5/Omniminds.Desktop_0.1.5_aarch64.dmg"
        },
        "windows-x86_64": {
          "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IG1pbmlzaWduIHB1YmxpYyBrZXk6IEZCNjYwQkI2OURGMDQ4NTMKUldSVFNQQ2R0Z3RtKzUzc2N6d3RtQ1V4eEV5NXo3bHVmU05wL3FrMGN2dW9hSFE4TTIzL1I5eEcK",
          "url": "https://github.com/omniminds-ai/desktop/releases/download/v0.1.5/omniminds-desktop.exe"
        }
      }
    });
  }
};
