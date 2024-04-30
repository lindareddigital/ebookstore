// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Endpoint = "https://directus-cms.vicosys.com.hk";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
import {
  createDirectus,
  graphql,
  staticToken,
  rest,
  uploadFiles,
} from "@directus/sdk";

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

  useUserToken = async (gql, token) => {
    console.log("90", token);

    const client = createDirectus("https://directus-cms.vicosys.com.hk")
      .with(graphql({ credentials: "include" }))
      .with(staticToken(token));

    const result = await client.query(gql);

    return result;
  };

  sdk = async (gql) => {
    const client = createDirectus("https://directus-cms.vicosys.com.hk")
      .with(graphql({ credentials: "include" }))
      .with(staticToken(process.env.NEXT_PUBLIC_TOKEN));

    const result = await client.query(gql);

    return result;
  };

  patchForm = async (token, id, transformedArray) => {
    const res = await fetch(
      `https://directus-cms.vicosys.com.hk/items/contact_form/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attachment: transformedArray,
        }),
      }
    );

    return res;
  };

  getPageBySlug = async (slug) => {
    const gql = `
    query {
        pages (filter: 
        {
          slug: { 
            _eq: "${slug}"
          }
        }
        ){
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
                  url
                  posts {
                    id
                    title
                    category{
                      slug
                    }
                    tags
                    key_image {
                        id
                    }
                  }
                  cards {
                      title
                      description
                      image {
                          id
                      }
                      youtube
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
                  image{
                    id
                  }
                }
                ... on block_richtext {
                  id
                  content
                }
                ... on block_product_query {
                  id
                  label
                  order_by
                  limit
                  category{ id, name }         
                }
                 ...on block_download_group {
                  id
                  title
                  download_item {
                    id
                    title
                    file {
                        id
                    }
                    external_url
                  }
                }
                ...on site_menu {
                  id
                  title
                  channel
                  menu_items{
                    site_menu_items_id {
                      id
                      title
                      slug
                      query_tags
                      type
                      category {
                        category_id {
                          id
                          name
                          slug
                        }
                      }
                    }
                  }
                }
                ...on promotion {
                    id
                    url
                    name
                    image {
                        id
                    }
                    status
                    start_at
                    end_at
                }
          }
          }
        }
      }
    `;

    return await this.sdk(gql);
  };

  getSearchKeywords = async () => {
    return;
  };

  getUserBookMark = async (id, token) => {
    console.log("token", token);

    const gql = `
      query {
        user_bookmark(
            filter: {
            user: {
              _eq: "${id}"
            }
        }
        ) { 
            id
            product {
              id
              title
            }
        }
    }
    `;

    console.log("getUserBookMark", gql);

    return await this.useUserToken(gql, token);
  };

  setUserBookMark = async (token) => {
    console.log("token", token);

    const gql = `
      query {
        user_bookmark(
            filter: {
            user: {
              _eq: "${id}"
            }
        }
        ) { 
            id
            product {
                id
                title
            }
        }
    }
    `;
    return await this.useUserToken(gql, token);
  };

  getNaviMenu = async () => {
    const gql = `
      query {
        site_menu( 
        filter: {
        channel: {
          _eq: "navi-menu"
        }       
        }) 
        { 
          id
          title
          publisher
          menu_items {
            site_menu_items_id {
              id
              title
              slug
              query_tags
            }
          }
        }
      } 
    `;
    return await this.sdk(gql);
  };

  getSideMenuByPublisher = async (publisher_slug) => {
    const gql = `query {
      site_menu( 
        filter: {
          publisher:
          {
            _eq: "${publisher_slug}"
          },         
      }) 
      { 
        id
        title
        publisher
        channel
        menu_items {
          site_menu_items_id {
            id
            title
            slug
            type
            landing
            query_tags
            category {
              category_id {
                id
                name
                slug
              }
            }
          }
        }
      }
    }`;

    return await this.sdk(gql);
  };

  getSideMenuByChannelAndSlug = async (channel, category_slug) => {
    const gql = `
    query {
    site_menu(
      filter: {
        channel: {
          _eq: "${channel}"
        }
      }
    ) {
      id
      title
      publisher
      menu_items(filter: { site_menu_items_id: { slug: { _eq: "${category_slug}" } } }) {
        site_menu_items_id {
          id
          title
          slug
          query_tags
        }
      }
    }
  }`;

    console.log("getSideMenuByChannelAndSlug", gql);

    return await this.sdk(gql);
  };

  getProductDetail2 = () => {
    return this.get({
      path: `/items/product/?fields[]=*&fields[]=images.*`,
    });
  };

  getProductDetail = async () => {
    const gql = `
        query {
        product {
            id
            status
            sort
            title
            Author
            Publisher {
            id
            slug
            }
            illustrator
            keyword
            series
            book_number
            description
            Language
            binding_layout
            isbn
            format
            table_of_contents
            date_created
            date_updated
            price
            discounted_price
            discount 
            cover_image{
              id
            }
            images{
              id
              product_id{
                id
              }
              directus_files_id{
                id
              }
            }
            tags {
              id
            category_id {
              id
            }
            }
        }  
    }
    
    `;

    // console.log("getSideMenuByChannelAndSlug", gql);

    return await this.sdk(gql);
  };

  getAllPosts = async () => {
    const gql = `
      query {
        posts
        {
          id
          title
          tags
          content
          category{
            id
            name
            slug
          }
          key_image{
            id
          }  
        }
      }
    `;

    console.log("getAllPosts", gql);

    return await this.sdk(gql);
  };

  getPosts = async (category, limit, page) => {
    let query = "";
    let query2 = "";

    if (category.length !== 0) {
      query = `
        filter: {
          category: {
            id:{
              _in: ["${category}"]
            } 
          }
        } `;
      query2 = `(
      filter: {
        category: {
          id:{
            _in: ["${category}"]
          } 
        }
      } )`;
    }
    const gql = `
      query {
        posts( 
          limit: ${limit}
          page: ${page} 
          ${query}      
        ) 
        {
          id
          title
          tags
          content
          category{
            id
            name
            slug
          }
          key_image{
            id
          }  
        }
        posts_aggregated
          ${query2}
         {
          countDistinct {
            id
          }
        }
      }
    `;

    console.log("getPosts", gql);

    return await this.sdk(gql);
  };

  getAllColumns = async () => {
    const gql = `
      query {
        posts
        {
          id
          title
          tags
          content
          category{
            id
            name
            slug
          }
          key_image{
            id
          }  
        }
      }
    `;

    console.log("getAllColumns", gql);

    return await this.sdk(gql);
  };

  getColumns = async (category, limit, page) => {
    let query = "";
    let query2 = "";

    if (category.length !== 0) {
      query = `
        filter: {
          category: {
            id:{
              _in: ["${category}"]
            } 
          }
        } `;
      query2 = `(
      filter: {
        category: {
          id:{
            _in: ["${category}"]
          } 
        }
      } )`;
    }
    const gql = `
      query {
        posts( 
          limit: ${limit}
          page: ${page} 
          ${query}      
        ) 
        {
          id
          title
          tags
          content
          category{
            id
            name
            slug
          }
          key_image{
            id
          }  
        }
        posts_aggregated
          ${query2}
         {
          countDistinct {
            id
          }
        }
      }
    `;

    console.log("getColumns", gql);

    return await this.sdk(gql);
  };

  getColumnsMenu = async () => {
    const gql = `
      query {
      site_menu( 
        filter: {
          publisher:{
            _eq: "polis-press"
          },
          channel: {
            _eq: "columns"
          }
        }
      ) 
      { 
        id
        title
        publisher
        channel
        menu_items {
          site_menu_items_id {
            id
            title
            slug
            type
            landing
            query_tags
            category {
              category_id {
                id
                name
                slug
              }
            }
          }
        }
      }
    } 
    `;
    return await this.sdk(gql);
  };

  passContactForm = () => {
    const gql = `
     query {
      contact_form( 
        
      ) 
      { 
    
      }
    } 
    `;
    return;
  };

  getDownload = () => {
    return;
  };

  // getReceipes
  getReceipes = () => {
    return;
  };

  getProductBySeries = async (
    publisher_slug,
    series_tags,
    limit,
    page,
    sort
  ) => {
    // const formattedArr = arr.map((item) => `"${item}"`).join(", ");
    const formattedArr = series_tags.map((item) => `"${item}"`).join('", "');
    console.log("333");

    const gql = `
      query {
        product(
          sort: ["${sort}"]
          limit: ${limit}
          page: ${page}
          filter: {
            series: {
              _in: [${formattedArr}]
            },
            Publisher: {
              slug: {
                _eq: "${publisher_slug}"
              }
            }
          }
        ) {
          id
          title
          Author
          Publisher {
            id
            slug
          }
          illustrator
          keyword
          series
          description
          table_of_contents
          date_created
          price
          discounted_price
          discount 
          cover_image{
            id
          }
          tags {
            id
            category_id {
              id
            }
          }
        }
        product_aggregated(
          filter: {
            series: {
              _in: [${formattedArr}]
            },
            Publisher: {
              slug: { 
                _eq: "${publisher_slug}"
              }
            }
          }
        ) {
          countDistinct {
            id
          }
        }
      }
    `;

    console.log("getProductBySeries", gql);

    return await this.sdk(gql);
  };

  getProductByCategory = async (
    publisher_slug,
    category,
    sort_by,
    page,
    limit
  ) => {
    const category_id = category.map((item) => `"${item}"`).join(", ");
    const sort_by_json = sort_by.map((item) => `"${item}"`).join(", ");

    const gql = `
      query {
        product ( 
          sort: [${sort_by_json}]
          page: ${page}
          limit: ${limit}
          filter: {
            tags: { 
              category_id:{
                id :{
                  _in: [${category_id}]
                }
              }
            }
            Publisher: {
              slug: { 
                _eq: "${publisher_slug}"
              }
            }
          }
        ) 
        {
          id
          title
          keyword
          series
          description
          table_of_contents
          date_created
          price
          discounted_price
          discount 
          cover_image{
            id
          }
          tags {
            id
            category_id {
              id
            }
          }
        }
        product_aggregated(filter: {
          tags: { 
            category_id:{
              id :{
                _in: [${category_id}]
              }
            }
          },
          Publisher: {
            slug: { 
              _eq: "${publisher_slug}"
            }
          }
        }) 
        {     
          countDistinct {
            id
          }
        }
    }
    `;

    console.log("getProductByCategory", gql);

    return await this.sdk(gql);
  };

  getProductByPublisher = async (publisher_slug, page, limit, sort_by) => {
    const sort_by_json = sort_by.map((item) => `"${item}"`).join(", ");
    let query = "";

    if (!limit) {
      query = ``;
    } else {
      query = `limit: ${limit} `;
    }

    const gql = `
    query {
        product ( 
          sort: [${sort_by_json}]
          ${query} 
          page: ${page}
          filter: {
            Publisher: {
              slug: { 
                _eq: "${publisher_slug}"
              }
            }
          }
        ) 
        {
          id
          title
          Author
          Publisher {
            id
            slug
          }
          illustrator
          keyword
          series
          description
          table_of_contents
          date_created
          price
          discount
          discounted_price
          cover_image{
            id
          }
          tags {
            id
            category_id {
              id
            }
          }
        }
        product_aggregated(filter: {
          Publisher: {
            slug: { 
              _eq: "${publisher_slug}"
            }
          }
        }) 
        {     
          countDistinct {
            id
          }
        }
    }
    `;

    console.log("getProductByPublisher", gql);

    return await this.sdk(gql);
  };

  getAllBooks = async () => {
    const gql = `
      query {
        product(
        
          filter: {

          }
        ) 
        {
          id
          title
          keyword
          publisher
          series
          cover_image{
            id
          }
          tags {
            id
            category_id {
              id
            }
          }
        }
      }
    `;

    console.log("getallBooks", gql);

    return await this.sdk(gql);
  };
}

export default ApiManager.getSharedInstance();

