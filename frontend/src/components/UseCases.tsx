import './UseCases.css';

const UseCases = () => {
  const teamSizes = [
    { title: 'For Individuals', desc: 'Personal scheduling made simple', icon: '👤' },
    { title: 'For Teams', desc: 'Collaborative scheduling for groups', icon: '👥' },
    { title: 'For Organizations', desc: 'Larger teams scheduling for more control & security', icon: '🏢' },
    { title: 'For Enterprises', desc: 'Enterprise-level scheduling solutions', icon: '🏦' },
  ];

  const useCases = [
    { title: 'Recruiting', icon: '📩' },
    { title: 'Sales', icon: '💰' },
    { title: 'HR', icon: '👥' },
    { title: 'Education', icon: '🎓' },
    { title: 'Support', icon: '📞' },
    { title: 'Healthcare', icon: '🔬' },
    { title: 'Telehealth', icon: '💬' },
    { title: 'Marketing', icon: '📊' },
  ];

  return (
    <section className="use-cases">
      <div className="container">
        <div className="use-cases-split">
          <div className="team-section">
            <h2 className="section-label">By team size</h2>
            <div className="team-grid">
              {teamSizes.map((item, i) => (
                <div key={i} className="team-item">
                  <div className="icon-container">{item.icon}</div>
                  <div className="team-text">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="case-section">
            <h2 className="section-label">By use case</h2>
            <div className="case-grid">
              {useCases.map((item, i) => (
                <div key={i} className="case-item">
                  <div className="icon-container">{item.icon}</div>
                  <h3>{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
