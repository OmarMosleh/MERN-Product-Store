import React, { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products: ", products);
  return (
    <>
      <Container maxW={{base:"lg", 
      md:"xl",
        lg:"1000px"}} py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            Current Products 🚀
          </Text>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }} //to make it responsive 1 column is base, 2 for md screens and above, and so on
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
          {products.length === 0 && ( <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No Products Found 😥 &nbsp;
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>)}
        </VStack>
      </Container>
    </>
  );
};

export default HomePage;
