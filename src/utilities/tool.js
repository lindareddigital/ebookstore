import { Metadata } from 'next';



export const getDetailLink = (id) => {
  // const lng = useGlobalStore.getState().lng;
  // const trimStr = searchInputValue.trim();
  // if (process.env=== 'true') {
  //   return `${process.env}/${id}`;
  // }
  return `/detail/${id}`;
};

export const getMetaData = (metaInfo) => {
  if (!metaInfo) return {};
  let meta = {
    alternates: {},
    openGraph: {}
  };

  Object.values(metaInfo).forEach((item) => {
    if ('name' in item) {
      meta[item.name] = item.content;
    } else if ('rel' in item) {
      meta.alternates = {
        ...meta.alternates,
        [item.rel]: item.href
      };
    } else if ('property' in item) {
      if (item.property === 'og:type') return;
      const replaceOg = item.property.replace('og:', '');
      const property = snakeToCamel(replaceOg);
      meta.openGraph = {
        ...meta.openGraph,
        [property]: item.content
      };
    }
  });

  return meta;
};
