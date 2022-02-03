import Guide from 'docs/layout';
module.exports = Guide();
const { title, step, code, copy, layout, imports } = module.exports;

title`Mosaic Layout Component`;
layout`
title title 
code1 code1
`;
code`
function Page() {
  const Layout = Mosaic.template\`
    description description type type
    menu menu cuisine cuisine
    mainImage mainImage categories categories
    . . ageRestriction ageRestriction
    . . duration duration
    . . locations locations
    . . chefName speciality
    . . chefImage chefImage
  \`;
  function Cell({ name }) {
    return <div>{name}</div>;
  }
  return (
      <Mosaic
          gap="20px"
          name="example"
          areas={\`
            section1 section1
            GAP GAP
            title2 title2
            section2 section2
          \`}
      >
          <Layout name="section1">
              <div name="description">Description</div>
              <div name="menu">Menu</div>
              <div name="mainImage">Main Image</div>
              <div name="type">Type</div>
              <div name="cuisine">Cuisine</div>
              <div name="categories">Categories</div>
              <div name="ageRestriction">Age Restriction</div>
              <div name="duration">Duration</div>
              <div name="locations">Locations</div>
              <div name="chefName">Chef name</div>
              <div name="speciality">Speciality</div>
              <div name="chefImage">Chef Image</div>
          </Layout>
          <div name="GAP" />
          <strong name="title2">Mosaic With Iterator</strong>
          <Layout name="section2">
              <Mosaic.Iterator>
                  <Cell />
              </Mosaic.Iterator>
          </Layout>
      </Mosaic>
  );
}
`;

imports.Mosaic({
  path: 'mosaic',
  import: import('ui/mosaic'),
});
