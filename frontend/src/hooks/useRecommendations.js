// useRecommendations.js

import recommendationsService from '../services/recommendation.service';

function useRecommendations(products) {
  const { getRecommendations } = recommendationsService();

  const handleRecomendations = (formData) => {
    return getRecommendations(formData, products);
  };

  return { handleRecomendations };
}

export default useRecommendations;
