import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';
import dracula from 'prism-react-renderer/themes/dracula';
import Mosaic from 'lib/ui/mosaic';
import Iterator from 'lib/util/iteration';
import { Page } from 'lib/ui/page';
import Guides from 'docs/guides';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import useClickOutside from 'lib/hooks/useClickOutside';

function CopyIcon({ ...rest }) {
  return (
    <div {...rest}>
      <span class="material-icons">content_copy</span>
    </div>
  );
}

const PageContainer = styled(Page)`
  overflow: auto;
  display: grid;
  gap: 20px;
  background: #131313;
  color: #dfdfdf;
  scroll-behavior: smooth;
`;
// ul {
//   margin: 0;
// }
// li {
//   font-size: large;
// }
// label {
//   color: #131313;
// }
// input {
//   background: #fdfdfd;
// }
const CodeLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  box-sizing: border-box;
`;

const Copy = styled(CopyIcon)`
  cursor: pointer;
  position: absolute;
  outline: none;
  z-index: 100;
  color: #8080f8;
  top: 8px;
  right: 8px;
  background-size: cover;
  transition: 0.3s;
  cursor: pointer;
  height: 30px;
  width: 30px;
  opacity: 0.7;
`;

// &:hover {
//   opacity: 1;
//   transform: scale(1.1);
// }
// &:focus {
//   opacity: 1;
//   color: green;
// }

const LiveCopy = styled.div`
  position: relative;
`;

const Example = styled.div`
  max-width: 100%;
`;

// article {
//   background: #dfdfdf;
//   color: #131313;
//   padding: 8px;
//   border-radius: 4px;
// }
// strong {
//   display: block;
//   text-align: center;
//   margin-bottom: 20px;
// }
const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px;
  background: #4f4f69c7;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
  backdrop-filter: blur(50px);
  height: 100vh;
  z-index: 1200;
  display: grid;
  grid-auto-rows: min-content;
  gap: 10px;
`;

// strong {
//   font-size: x-large;
//   display: flex;
//   gap: 20px;
//   align-items: center;
// }
// a {
//   font-size: large;
//   color: #dfdfdf;
// }

const Expand = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4f4f69c7;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
  backdrop-filter: blur(50px);
  cursor: pointer;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xx-large;
`;

const Collapse = styled.div`
  cursor: pointer;
  font-size: xx-large;
`;

const titles = Guides.map(guide => guide.title);

function TableOfContents() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, () => {
    if (open) setOpen(false);
  });
  return open ? (
    <Drawer ref={ref}>
      <strong>
        <Collapse title="collapse" onClick={() => setOpen(false)}>
          👉
        </Collapse>
        Table of Contents
      </strong>
      <Iterator values={titles}>
        {({ value }) => (
          <li>
            <a href={`#${value}`} onClick={() => setOpen(false)}>
              {value}
            </a>
          </li>
        )}
      </Iterator>
    </Drawer>
  ) : (
    <Expand title="Table of Contents" onClick={() => setOpen(true)}>
      𝌞
    </Expand>
  );
}

const format = value =>
  value
    .trim()
    .split('\n')
    .flatMap((text, i) => [i > 0 && <br key={i} />, text]);

function Title({ name, value }) {
  useLayoutEffect(() => {
    if (location.hash?.split('#').includes(encodeURIComponent(value))) {
      setTimeout(() => ref.current?.scrollIntoView(), 300);
    }
  });
  const ref = useRef();
  return (
    <h2 name={name} id={value} ref={ref}>
      {value}
    </h2>
  );
}

function CopyBlock({ code, scope, onChange }) {
  return (
    <LiveProvider code={code} theme={dracula} scope={scope} disabled>
      <LiveCopy>
        <Copy
          tabIndex="1"
          onClick={() => navigator.clipboard.writeText(code)}
        />
        <LiveEditor style={{ fontSize: 'large' }} onChange={onChange} />
      </LiveCopy>
    </LiveProvider>
  );
}

export function Code({ value, imports }) {
  const [[scope, importStatements], setScope] = useState([]);
  useEffect(() => {
    if (!imports) return;
    const importScope = {};
    Promise.all(
      Object.entries(imports).map(async ([name, value]) => {
        await value.import.then?.(x => {
          importScope[name] = x.default ?? x;
          return x;
        });
        return `import ${name} from '${value.path}';`;
      })
    ).then(statements => setScope([importScope, statements.join('\n')]));
  }, [imports]);
  const [code, setCode] = useState(value.code?.trim());
  if (imports && !scope) return null;
  if (value.noPreview) {
    return <CopyBlock code={code} scope={scope} />;
  }
  return (
    <LiveProvider code={code} theme={dracula} scope={scope}>
      <CodeLayout>
        <div>
          {importStatements && <CopyBlock code={importStatements} />}
          <LiveCopy>
            <Copy
              tabIndex="1"
              onClick={() =>
                navigator.clipboard.writeText(importStatements + '\n\n' + code)
              }
            />
            <LiveEditor style={{ fontSize: 'large' }} onChange={setCode} />
          </LiveCopy>
        </div>
        <Example>
          <strong>Live Preview</strong>
          <LiveError style={{ color: '#ff0266b8' }} />
          <article>
            <LivePreview />
          </article>
        </Example>
      </CodeLayout>
    </LiveProvider>
  );
}

export default function MetaDocs() {
  return (
    <PageContainer>
      <TableOfContents />
      <Iterator values={Guides}>
        {({ value }) => (
          <Mosaic areas={value.layout}>
            <Title name="title" value={value.title} />
            <Iterator values={value.codeblocks}>
              {({ value: code, index }) => (
                <Mosaic.Cell name={'code' + (index + 1)}>
                  <Code value={code} imports={value.imports} />
                </Mosaic.Cell>
              )}
            </Iterator>
            <Iterator values={value.steps}>
              {({ value, index }) => (
                <Mosaic.Cell name={'step' + (index + 1)}>
                  <ul>
                    <li>{format(value)}</li>
                  </ul>
                </Mosaic.Cell>
              )}
            </Iterator>
          </Mosaic>
        )}
      </Iterator>
    </PageContainer>
  );
}
