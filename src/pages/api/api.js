// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Endpoint = "https://directus-cms.vicosys.com.hk";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
import {createDirectus, graphql, staticToken} from "@directus/sdk";

class ApiManager {
  static instance;
  defaultData = {
    timestamp: Date.now(),
  };
  static token = "";
  static getSharedInstance = () => {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  };

  constructor() {}

  get = async (params) => {
    const { path, data, customHeader = {} } = params;
    const fetchEndpoint = `${Endpoint}${path}`;

    console.log("fetchEndpoint", fetchEndpoint);
    // await this.getToken();
    const response = await fetch(fetchEndpoint, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        ...customHeader,
      },
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(
        JSON.stringify(
          result.error.message ? result.error : { message: result.error }
        )
      );
    } else {
      return result;
    }
  };
  post = (params) => {
    return this.request({ ...params, method: "POST" });
  };
  put = (params) => {
    return this.request({ ...params, method: "PUT" });
  };
  delete = (params) => {
    return this.request({ ...params, method: "DELETE" });
  };

  request = async ({ path, method, data, customHeader }) => {
    const fetchEndpoint = `${path}`;

    // await this.getToken();
    const response = await fetch(fetchEndpoint, {
      method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        ...customHeader,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(
        JSON.stringify(
          result.error.message ? result.error : { message: result.error }
        )
      );
    } else {
      return result;
    }
  };

  getCategoryList = (id) => {
    return this.get({
      path: `/items/Book?fields=*.*&filter[Category][_eq]=${id}`,
    });
  };

  getNew = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${TOKEN} `);
    myHeaders.append("mode", "no-cors");

    const query = `query {
        pages {
          id
          status
          sort
          user_created {
          id
          }
          user_updated {
          id
          }
          date_created
          date_updated
          title
          slug
          blocks {
          id
          collection
          item {
                ... on block_cardgroup {
                  id
                  content
                  group_type
                  posts {
                      posts_id {
                          id
                          title
                          tags
                          key_image {
                              id
                              location
                          }
                      }
                  }
                  cards {
                      title
                      description
                      image {
                          id
                      }
                  }
                }
                ... on block_hero_group {
                  id
                  headline
                  hero_cards {
                      block_hero_id {
                          headline
                          image {
                              id
                          }
                          url
                      }
                  }
                }
                ... on block_hero {
                  id
                  content
                }
                ... on block_richtext {
                  id
                  content
                }
          }
          }
        }

      product {
          title
          series
        }
      }`;

    query.replace(/(?:\r\n|\r|\n)/g, "\\n");

    const response = await fetch(
      "https://directus-cms.vicosys.com.hk/graphql",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          query,
          variables: {},
        }),
        redirect: "follow",
      }
    );
    const result = await response.json();
    return result;
  };

  getAllBooks = () => {
    return this.get({ path: `/items/dayi?fields=*.*` });
  };

  getHaibin = () => {
    return this.get({ path: `/items/haibin?fields=*.*` });
  };

  getRecipe = () => {
    return this.get({ path: `/items/haibin?filter[Category][_eq]=飲食` });
  };

  getSiteMenu = () => {
    return this.get({ path: `/items/site_menu/?fields[]=menu_items.*.*` });
  };

  getDetail = () => {
    return this.get({
      path: `/items/product/?fields[]=*&fields[]=images.*`,
    });
  };

  getSlugProduct = () => {
    return this.get({
      path: `/items/site_menu_items/?fields[]=*.category.*&fields[]=category.category_id.name&fields[]=category.category_id.slug&fields[]=category.category_id.id`,
    });
  };

  sdk = async (gql) => {
    const client = createDirectus("https://directus-cms.vicosys.com.hk")
      .with(graphql({ credentials: "include" }))
      .with(staticToken(process.env.NEXT_PUBLIC_TOKEN));

    const result = await client.query(gql);

    return result;
  };

  getSlug = async (channel, slug) => {
    const gql = `
      query {
      site_menu( 
        limit: 1
        filter: {
        menu_items: {
          site_menu_items_id: {
            slug: {
              _eq: "${slug}"
            }
          }
        }
        channel: {
          _eq: "${channel}"
        }
          
      }) { 
          id
          title
          publisher
          menu_items {
              site_menu_items_id {
                  id
                  title
                  slug
                  category {
                      category_id {
                          id
                          name
                      }
                  }
              }
          }
      }
  }
    `;

    console.log("getSlug", gql);

    return await this.sdk(gql);
  };

  getFilterBooks = async (query) => {
    const gql = `
      query {
        product(filter: {
          tags: {
            category_id: {
              id: {
                _in: ["${query}", "43c9b82e-a56e-43e8-8d7f-53ccec70ef2c"]
              }
            }
          }
        }) 
        {
          id
          title
          keyword
          series
          tags {
            id
            category_id {
              id
            }
          }
        }
      }
    `;

    console.log("getFilterBooks", gql);

    return await this.sdk(gql);
  };
}

export default ApiManager.getSharedInstance();

