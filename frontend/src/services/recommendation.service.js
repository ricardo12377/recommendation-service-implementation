const recommendationsService = () => {
  const getRecommendations = (
    formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    },
    products
  ) => {
    const {
      selectedFeatures,
      selectedPreferences,
      selectedRecommendationType,
    } = formData;
    let response = [];

    if (products.length === 0) return response;

    for (const product of products) {
      const canFilterPreferences =
        selectedPreferences && selectedPreferences.length > 0;

      if (canFilterPreferences) {
        for (const preference of product.preferences) {
          if (selectedPreferences.includes(preference)) {
            const exists = response.some((item) => item.id === product.id);
            if (!exists) response.push(product);
          }
        }
      }

      const canFilterFeatures = selectedFeatures && selectedFeatures.length > 0;

      if (canFilterFeatures) {
        for (const feature of product.features) {
          if (selectedFeatures.includes(feature)) {
            const exists = response.some((item) => item.id === product.id);
            if (!exists) response.push(product);
          }
        }
      }
    }

    if (response.length > 0 && selectedRecommendationType === 'SingleProduct') {
      const lastMatchProduct = response[response.length - 1];

      return [lastMatchProduct];
    }

    return response;
  };

  return {
    getRecommendations,
  };
};

export default recommendationsService;
