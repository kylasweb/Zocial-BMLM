import React, { useState } from 'react';

const SkillTree = () => {
  const [skills] = useState({
    recruitment: {
      name: 'Recruitment Mastery',
      levels: [
        {
          level: 1,
          name: 'Basic Recruitment',
          requirement: 5,
          bonus: { recruitmentBonus: 5 }
        },
        {
          level: 2,
          name: 'Advanced Recruitment',
          requirement: 20,
          bonus: { recruitmentBonus: 10, unlocks: ['team-tools'] }
        }
      ]
    },
    leadership: {
      name: 'Leadership',
      levels: [
        {
          level: 1,
          name: 'Team Leader',
          requirement: { teamSize: 10 },
          bonus: { teamBonus: 5 }
        }
      ]
    }
  });

  return (
    <div className="skill-tree-container">
      {Object.entries(skills).map(([skillKey, skill]) => (
        <div key={skillKey} className="skill-branch">
          <h3 className="skill-title">{skill.name}</h3>
          <div className="skill-levels">
            {skill.levels.map((level) => (
              <div key={level.level} className="skill-level">
                <h4>{level.name}</h4>
                <p>Level: {level.level}</p>
                <p>
                  Requirement: {
                    typeof level.requirement === 'object' 
                      ? `Team Size: ${level.requirement.teamSize}`
                      : level.requirement
                  }
                </p>
                <div className="bonus-info">
                  <h5>Bonuses:</h5>
                  {Object.entries(level.bonus).map(([bonusKey, bonusValue]) => (
                    <p key={bonusKey}>
                      {bonusKey}: {
                        Array.isArray(bonusValue) 
                          ? bonusValue.join(', ')
                          : bonusValue
                      }
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillTree;
