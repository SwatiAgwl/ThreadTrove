import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { fetchCategories } from '../services/operations/productapi';
import { useEffect } from 'react';
import { getCategoryPageData } from '../services/operations/productapi';
import { ErrorPage } from './ErrorPage';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';

export const CategoryPage = () => {
    const {categoryName}= useParams();
    const [categoryPageData, setCategoryPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");


    // fetch all categories
    const getCategories= async()=>{
        const categories= await fetchCategories();
        if (!categoryName || categoryName.trim() === "") {
            console.error("categoryName is undefined or empty");
            return;
        }

        // Filter categories
        const matchedCategories = categories.filter(ct => ct.name.split(" ").join("-").toLowerCase() === categoryName.toLowerCase());

        // Ensure there is at least one matched category
        if (matchedCategories.length === 0) {
            console.error(`No category found for name: ${categoryName}`);
            return;
        }

        // Get the category ID
        const category_id = matchedCategories[0]._id;
        console.log("category id is: ",category_id);

        setCategoryId(category_id)
        // const category_id= categories.filter( (ct)=> ct.name.split(" ").join("/").toLowerCase()=== categoryName)[0]._id;
        // setCategoryId(category_id);
    }
    useEffect(()=>{
        getCategories();  
    },[categoryName]);

    // get category page data
    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCategoryPageData(categoryId);
                console.log("category page data fetched is ",res);
                setCategoryPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) { // ie agr categoryId null nhi hai tbhi call kro 
            getCategoryDetails();
        }
        
    },[categoryId]);


//   return (
//     <div>
//         <div>
//             {
//             !categoryId ? ( <ErrorPage/>):
//             ( 
//             <div>
//                 <div>
//                     <p>Home / {categoryPageData?.selectedCategory?.name}</p>
//                     <p>{categoryPageData?.selectedCategory?.name}: {categoryPageData?.selectedCategory?.products?.length}</p>
//                 </div>
//                 {/* prouduct cards */}
//                 <div>
//                     {
//                     categoryPageData?.selectedCategory?.products?.length !==0 && (
//                         <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                             {
//                             categoryPageData?.selectedCategory?.products.map( (product,index)=> (
//                                <ProductCard product={product} key={index}/>
//                             ))
//                             }
//                         </div>
//                     )
//                 }
//                 </div>
//             </div>
//             )
//          }
//         </div>

//     </div>
//   )
// }
return (
    <div className='w-11/12 sm:w-10/12 max-w-maxContent mx-auto py-6 mb-8'>
      <div>
        {!categoryId ? (
          <ErrorPage />
        ) : (
          <div className=' w-full flex flex-col gap-6'>
            {/* heading */}
            <div className=''>
              <p className='text-sm text-gray-500'>
                Home / {categoryPageData?.selectedCategory?.name}
              </p>
              <p className='text-xl font-semibold'>
                {categoryPageData?.selectedCategory?.name}: {categoryPageData?.selectedCategory?.products?.length}
              </p>
            </div>
            {/* Product cards */}
            <div>
              {categoryPageData?.selectedCategory?.products?.length !== 0 ? (
                <div className='grid grid-cols-2 gap:2 md:grid-cols-3 lg:grid-cols-4 md:gap-8'>
                  {categoryPageData?.selectedCategory?.products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                  ))}
                </div>
              ) : (
                <p className='h-screen text-center text-lg font-semibold text-gray-500'>
                  No products available in this category.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}  