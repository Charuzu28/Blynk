import {
  apiRequest,
} from "../../../services/apiClient";

export const getSettings = async () => {
  const data = await apiRequest(
    "/api/settings"
  );

  return data.settings;
};

export const updateSettingsRequest = async (
  settings
) => {
  const data = await apiRequest(
    "/api/settings",
    {
      method: "PATCH",
      body: JSON.stringify(settings),
    }
  );

  return data.settings;
};