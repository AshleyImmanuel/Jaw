import Jaw, { setRenderCallback, __resetComponentCounters } from '@jaw/runtime';
import { Box, Row, Column, Text, Button, Spacer, Scroll } from '@jaw/components';
import { render } from '@jaw/renderer-web';

function Header() {
  return Jaw.createElement(Row, {
    style: {
      width: '100%',
      height: 60,
      backgroundColor: '#1e293b',
      borderBottomWidth: 1,
      borderColor: '#334155',
      alignItems: 'center',
      paddingLeft: 24,
      paddingRight: 24,
    }
  },
    Jaw.createElement(Text, {
      style: { fontSize: 20, fontWeight: 'bold', color: '#38bdf8' }
    }, 'Jaw Framework'),
    Jaw.createElement(Spacer, {}),
    Jaw.createElement(Text, {
      style: { fontSize: 14, color: '#94a3b8' }
    }, 'Beta 1')
  );
}

function CounterCard() {
  const [count, setCount] = Jaw.createState(0);

  return Jaw.createElement(Column, {
    style: {
      backgroundColor: '#1e293b',
      padding: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#334155',
      alignItems: 'center',
      gap: 16,
      width: 300,
    }
  },
    Jaw.createElement(Text, {
      style: { fontSize: 18, color: '#e2e8f0', fontWeight: 'bold' }
    }, 'Interactive Counter'),
    Jaw.createElement(Text, {
      style: { fontSize: 48, color: '#38bdf8', fontWeight: 'bold' }
    }, `${count()}`),
    Jaw.createElement(Row, { style: { gap: 12, width: '100%', justifyContent: 'center' } },
      Jaw.createElement(Button, {
        label: '-1',
        onPress: () => setCount(c => c - 1),
        style: {
          backgroundColor: '#ef4444',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 24,
          paddingRight: 24,
          borderRadius: 8,
        }
      }),
      Jaw.createElement(Button, {
        label: '+1',
        onPress: () => setCount(c => c + 1),
        style: {
          backgroundColor: '#22c55e',
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 24,
          paddingRight: 24,
          borderRadius: 8,
        }
      })
    )
  );
}

function DemoList() {
  // A scrollable list of items
  return Jaw.createElement(Scroll, {
    scrollDirection: 'vertical',
    style: {
      flex: 1,
      width: '100%',
      backgroundColor: '#0f172a',
      padding: 16,
    }
  },
    Jaw.createElement(Column, { style: { gap: 12 } },
      ...Array.from({ length: 20 }).map((_, i) =>
        Jaw.createElement(Row, {
          key: i,
          style: {
            backgroundColor: '#1e293b',
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#334155',
            alignItems: 'center',
          }
        },
          Jaw.createElement(Box, {
            style: {
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#38bdf8',
              alignItems: 'center',
              justifyContent: 'center',
            }
          },
            Jaw.createElement(Text, { style: { color: '#0f172a', fontWeight: 'bold' } }, `${i + 1}`)
          ),
          Jaw.createElement(Spacer, { size: 16 }),
          Jaw.createElement(Column, { style: { gap: 4 } },
            Jaw.createElement(Text, { style: { color: '#e2e8f0', fontWeight: 'bold' } }, `List Item ${i + 1}`),
            Jaw.createElement(Text, { style: { color: '#94a3b8', fontSize: 12 } }, 'Scrollable content test')
          )
        )
      )
    )
  );
}

function App() {
  return Jaw.createElement(Column, {
    style: {
      width: '100%',
      height: '100%',
    }
  },
    Jaw.createElement(Header, null),
    Jaw.createElement(Row, {
      style: {
        flex: 1,
        width: '100%',
      }
    },
      // Sidebar with counter
      Jaw.createElement(Column, {
        style: {
          width: '40%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: 1,
          borderColor: '#334155',
        }
      },
        Jaw.createElement(CounterCard, null)
      ),
      // Main content area with scroll
      Jaw.createElement(Column, {
        style: {
          flex: 1,
          height: '100%',
        }
      },
        Jaw.createElement(DemoList, null)
      )
    )
  );
}

// Ensure the body has no margin
document.body.style.margin = '0';
document.body.style.backgroundColor = '#0f172a';

const container = document.getElementById('jaw-root')!;
const doRender = render(Jaw.createElement(App, null), container);

setRenderCallback(() => {
  __resetComponentCounters();
  doRender(Jaw.createElement(App, null));
});
