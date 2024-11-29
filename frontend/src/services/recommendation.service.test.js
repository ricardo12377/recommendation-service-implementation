import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const { getRecommendations } = recommendationService();

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const { getRecommendations } = recommendationService();

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const { getRecommendations } = recommendationService();

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const { getRecommendations } = recommendationService();

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna vazio caso não tenha nenhuma preferência ou funcionalidade selecionada', () => {
    const formData = {
      selectedRecommendationType: 'SingleProduct',
    };

    const { getRecommendations } = recommendationService();

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(0);
  });

  test('O programa não pode quebrar caso chegue algum dado com o tipo errado no serviço', () => {
    const formData = {
      selectedRecommendationType: 'SingleProduct',
      selectedPreferences: 146237,
      selectedFeatures: 'wrong type value',
    };

    const { getRecommendations } = recommendationService();

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(0);
  });
});
