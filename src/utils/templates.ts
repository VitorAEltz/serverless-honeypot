export async function loadTemplate(templateName: string): Promise<string> {
  try {
    const response = await getAsset(templateName);
    if (!response.ok) {
      throw new Error(`Failed to fetch template: ${templateName}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading template ${templateName}:`, error);
    throw error;
  }
}
const getAsset = async (templateName: string) => {
  try {
    const assetUrl = new URL(templateName, "file://");
    return fetch(assetUrl);
  } catch (e) {
    return new Response((e as Error).message || (e as Error).toString(), { status: 404 });
  }
};
export const templates = {
  homepage: () => loadTemplate('./homepage.html'),
  adminPanel: () => loadTemplate('./admin-panel.html'),
  login: () => loadTemplate('./login.html'),
  dashboard: () => loadTemplate('./dashboard.html'),
};
