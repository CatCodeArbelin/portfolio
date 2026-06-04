import { useEffect, useState } from 'react';
import { getDesignCards, type DesignCard } from '../api/portfolio';

type DesignCardsState =
  | { status: 'loading' }
  | { status: 'ready'; data: DesignCard[] }
  | { status: 'error'; message: string };

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Не удалось загрузить карточки системного дизайна.';
}

export function DesignCardsSection() {
  const [designCardsState, setDesignCardsState] = useState<DesignCardsState>({ status: 'loading' });

  useEffect(() => {
    let isMounted = true;

    getDesignCards()
      .then((data) => {
        if (isMounted) {
          setDesignCardsState({ status: 'ready', data });
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setDesignCardsState({ status: 'error', message: getErrorMessage(error) });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="sectionCard" aria-labelledby="design-cards-title">
      <div className="sectionHeader">
        <p className="eyebrow">System Design</p>
        <h2 id="design-cards-title">Как я проектирую системы</h2>
        <p>
          Карточки показывают задачу, схему, стек, ключевые решения, частые ошибки и путь
          масштабирования.
        </p>
      </div>

      {designCardsState.status === 'loading' && (
        <p className="stateMessage">Загружаем system design cards…</p>
      )}
      {designCardsState.status === 'error' && (
        <p className="stateMessage stateMessageError">{designCardsState.message}</p>
      )}
      {designCardsState.status === 'ready' && (
        <div className="designGrid">
          {designCardsState.data.map((card) => (
            <article className="designCard" key={card.slug}>
              <h3>{card.title}</h3>
              <p>{card.task}</p>
              <pre className="schemeBox" aria-label={`Схема ${card.title}`}>
                {card.scheme}
              </pre>
              <div className="designColumns">
                <div>
                  <h4>Ключевые решения</h4>
                  <ul>
                    {card.key_decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Ошибки</h4>
                  <ul>
                    {card.common_mistakes.map((mistake) => (
                      <li key={mistake}>{mistake}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Масштабирование</h4>
                  <ul>
                    {card.scaling_notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <ul className="inlineList" aria-label={`Стек карточки ${card.title}`}>
                {card.stack.map((stackItem) => (
                  <li key={stackItem}>{stackItem}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
