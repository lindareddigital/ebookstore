import { Metadata } from 'next';

// export default async function imgBlob(url){

//   const token = process.env.NEXT_PUBLIC_TOKEN;

//   const imageUrl = `${url}?access_token=${token}`;

//   const response = await fetch(imageUrl);
//   const blob = await response.blob();
//   const imageDataUrl = URL.createObjectURL(blob);


 
//   res.setHeader("Content-Type", response.headers.get("Content-Type"));
//   res.send(blob);
  
//   return imageDataUrl;
// };

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isInTimeRange = (start, end) =>{
  // Convert start and end times to Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);

  const currentTime = new Date();

  return currentTime >= startDate && currentTime <= endDate;
}

export const getPageColor = (publisher) => {
  if (publisher === "seashore") {
    return "seashore-color";
  } else if (publisher === "ichiban") {
    return "ichiban-color";
  }
  return "";
};

export const getPageBg = (publisher) => {
  if (publisher === "seashore") {
    return "seashore-bg";
  } else if (publisher === "ichiban") {
    return "ichiban-bg";
  }
  return "";
};

export const getPageFilter = (publisher) => {
  if (publisher === "seashore") {
    return "seashore-filter";
  } else if (publisher === "ichiban") {
    return "ichiban-filter";
  }
  return "";
};


export const extractYouTubeId = (url) => {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url?.match(regExp);
  
  return match ? match[1] : null;
}

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
