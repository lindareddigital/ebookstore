// pages/listing/[publisher].jsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PublisherPage = () => {
  const router = useRouter();
  const publisher  = "polis-press";
  const channel = router.query.channel;
  const slug = router.query.slug;
  const page = router.query.page || 1; // Default page number is 1
  const [menu, setMenu] = useState(null);
  const [matchedMenuItem, setMatchedMenuItem] = useState(null);
  const [products, setProducts] = useState(null);
  const [productTotalCount, setProductTotalCount] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.post(`/api/sitemenu/publisher/${publisher}`);
        setMenu(response.data.result.site_menu); // Extracting the site_menu array from the API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (publisher && channel && slug) {
      const menu = fetchMenu();
    //   const category = getCategoryByMenu(menu)
    //   const product = getProductsByCategory(category)
    //   setProducts(product)
    }
  }, [publisher, channel, slug]);


  useEffect(() => {
    if (menu && slug) {
      const matchedItem = findMenuItemBySlug(menu, slug);
      setMatchedMenuItem(matchedItem);
    }
  }, [menu, slug]);


  const findMenuItemBySlug = (menu, slug) => {
    for (const menuItem of menu) {
      for (const menuItemData of menuItem.menu_items) {
        if (menuItemData.site_menu_items_id.slug === slug) {
          return menuItemData.site_menu_items_id;
        }
      }
    }
    return null;
  };

  const getProductsByCategory = async (categoryIds, pageNum) => {
    try {
      const response = await axios.post(`/api/product/category`, { category_id: categoryIds,  });
      console.log('Products by category:', response.data);
      setProducts(response.data.result.product);
      setProductTotalCount(response.data.result.product_aggregated[0].count.id);
      // Handle the response here as needed
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  useEffect(() => {
    if (matchedMenuItem && matchedMenuItem.type === "product_by_category") {
      const categoryIds = matchedMenuItem.category.map(category => category.category_id.id);
      getProductsByCategory(categoryIds, page);
    }
  }, [matchedMenuItem]);

  return (
    <div>
      <h1>Publisher: {publisher}</h1>
      <h2>Channel: {channel}</h2>
      <h2>Slug: {slug}</h2>
      <h2>Page: {page}</h2>
      {menu && (
        <div>
          <h3>Data from API:</h3>
          <pre>{JSON.stringify(menu, null, 2)}</pre>
        </div>
      )}
      {matchedMenuItem && (
        <div>
          <h3>Matched Menu Item:</h3>
          <pre>{JSON.stringify(matchedMenuItem, null, 2)}</pre>
        </div>
      )}

      <div>
        <h3>Products</h3>
        <h3>Products Total {productTotalCount}</h3>
        <pre>{JSON.stringify(products, null, 2)}</pre>  
      </div>
    </div>
  );
};
export default PublisherPage;
