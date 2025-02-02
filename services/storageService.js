// services/storageService.js
const STORAGE_KEYS = {
  CUSTOM_TEAS: 'customTeas',
  SETTINGS: 'teaTimerSettings',
  RECENT_BREWS: 'recentBrews'
};

export const storageService = {
  // Custom Teas
  getCustomTeas: () => {
    try {
      const teas = localStorage.getItem(STORAGE_KEYS.CUSTOM_TEAS);
      return teas ? JSON.parse(teas) : [];
    } catch (error) {
      console.error('Error getting custom teas:', error);
      return [];
    }
  },

  saveCustomTea: (teaData) => {
    try {
      const existingTeas = storageService.getCustomTeas();
      const updatedTeas = [...existingTeas, teaData];
      localStorage.setItem(STORAGE_KEYS.CUSTOM_TEAS, JSON.stringify(updatedTeas));
      return true;
    } catch (error) {
      console.error('Error saving custom tea:', error);
      return false;
    }
  },

  deleteCustomTea: (teaName) => {
    try {
      const existingTeas = storageService.getCustomTeas();
      const updatedTeas = existingTeas.filter(tea => tea.name !== teaName);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_TEAS, JSON.stringify(updatedTeas));
      return true;
    } catch (error) {
      console.error('Error deleting custom tea:', error);
      return false;
    }
  },

  // Settings
  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  getSettings: () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        isMuted: false,
        theme: 'light'
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        isMuted: false,
        theme: 'light'
      };
    }
  },

  // Recent Brews History
  saveRecentBrew: (brewData) => {
    try {
      const recentBrews = storageService.getRecentBrews();
      recentBrews.unshift({
        ...brewData,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 10 brews
      const updatedBrews = recentBrews.slice(0, 10);
      localStorage.setItem(STORAGE_KEYS.RECENT_BREWS, JSON.stringify(updatedBrews));
      return true;
    } catch (error) {
      console.error('Error saving recent brew:', error);
      return false;
    }
  },

  getRecentBrews: () => {
    try {
      const brews = localStorage.getItem(STORAGE_KEYS.RECENT_BREWS);
      return brews ? JSON.parse(brews) : [];
    } catch (error) {
      console.error('Error getting recent brews:', error);
      return [];
    }
  },

  // Clear all data
  clearAllData: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};