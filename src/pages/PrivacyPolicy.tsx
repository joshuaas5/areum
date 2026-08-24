import LegalLayout from "@/components/LegalLayout";

const PrivacyPolicy = () => (
  <LegalLayout
    title="Política de Privacidade"
    description="Aqui explicamos, de forma simples, quais dados a Areum utiliza e como você pode exercer seus direitos."
    updatedAt="24 de agosto de 2026"
  >
    <p>
      A Areum Cosmetics respeita a sua privacidade. Esta política se aplica ao site areumco.com.br, ao formulário do Guia Glass Skin e aos contatos realizados com a marca.
    </p>

    <h2>Quais dados utilizamos</h2>
    <ul>
      <li>Nome, e-mail e WhatsApp informados por você no formulário do guia;</li>
      <li>Dados enviados voluntariamente em atendimentos por e-mail, Instagram ou WhatsApp;</li>
      <li>Informações técnicas de navegação e interação, como páginas visitadas, cliques e origem do acesso, coletadas por cookies e ferramentas de análise;</li>
      <li>Dados necessários à compra, ao pagamento e à entrega, tratados no ambiente de checkout da Yampi e pelos prestadores envolvidos no pedido.</li>
    </ul>

    <h2>Para que utilizamos os dados</h2>
    <p>
      Usamos os dados para liberar o guia solicitado, responder ao atendimento, enviar conteúdos e ofertas autorizados, medir o desempenho do site e das campanhas, processar pedidos, prevenir fraudes e cumprir obrigações legais.
    </p>
    <p>
      Quando o tratamento depender do seu consentimento, você poderá revogá-lo a qualquer momento. A revogação não afeta o uso realizado anteriormente de forma legítima.
    </p>

    <h2>Cookies e ferramentas</h2>
    <p>
      O site utiliza Google Analytics, Meta Pixel e Vercel Analytics para entender acessos, cliques e conversões. Essas empresas podem tratar identificadores técnicos conforme as próprias políticas. Você pode limitar cookies nas configurações do seu navegador.
    </p>

    <h2>Armazenamento e compartilhamento</h2>
    <p>
      Os contatos do Guia Glass Skin são armazenados no Supabase com controles de acesso. Dados podem ser compartilhados somente na medida necessária com fornecedores de hospedagem, análise, atendimento, checkout, pagamento, antifraude e logística, ou quando houver obrigação legal. A Areum não vende os seus dados pessoais.
    </p>
    <p>
      Alguns fornecedores podem processar dados fora do Brasil. Nesses casos, buscamos utilizar serviços com medidas adequadas de segurança e proteção de dados.
    </p>

    <h2>Por quanto tempo guardamos</h2>
    <p>
      Mantemos os dados pelo tempo necessário para cumprir as finalidades informadas, atender obrigações legais e exercer direitos. Contatos de marketing serão removidos ou bloqueados após a revogação, salvo quando a conservação for permitida ou exigida por lei.
    </p>

    <h2>Seus direitos</h2>
    <p>
      Você pode pedir confirmação do tratamento, acesso, correção, informação sobre compartilhamentos, revogação do consentimento e, quando aplicável, bloqueio ou exclusão dos dados. O pedido é gratuito e poderá exigir confirmação de identidade para sua proteção.
    </p>

    <h2>Como falar conosco</h2>
    <p>
      A operação da Areum Cosmetics, identificada pelo CNPJ 50.548.562/0001-42, é responsável pelas decisões sobre os dados tratados neste site. Para dúvidas, cancelamento de comunicações ou exercício de direitos, escreva para <a href="mailto:contato@areumco.com.br">contato@areumco.com.br</a> ou fale pelo WhatsApp <a href="https://wa.me/5547989258264">(47) 98925-8264</a>.
    </p>

    <h2>Atualizações</h2>
    <p>
      Esta política poderá ser atualizada para refletir mudanças no site, nos serviços ou na legislação. A versão vigente ficará sempre disponível nesta página.
    </p>
  </LegalLayout>
);

export default PrivacyPolicy;
