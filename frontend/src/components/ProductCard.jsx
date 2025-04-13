import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Input,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdateProduct] = useState(product);
  const textColor = useColorModeValue("gary.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error Deleting item",
        description: message,
        status: "error",
      });
    } else {
      toast({
        title: "Item Deleted Successfully",
        description: message,
        status: "success",
        duration: "5000",
        isClosable: true,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleUpdateProduct = async (pid, updatedProduct) => {
    
    const {success, message} = await updateProduct(pid, updatedProduct);
    onClose();
    if(!success){
      toast({
        title: "Error Updating Product",
        description: message,
        duration: "3000",
        status: "error"
      })
    }else{
      toast({
        title: "product Updated successfully ",
        description: message,
        status: "success",
        duration: "3000",
        isClosable: "true"
      })
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      bg={bg}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"48"}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb="2">
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<CiEdit />} colorScheme="blue" onClick={onOpen}  />
          <IconButton
            icon={<MdDelete />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e)=>setUpdateProduct({...updatedProduct, name:e.target.value})}
                ></Input>
                <Input
                  placeholder={"Price"}
                  name={"price"}
                  type={"number"}
                  value={updatedProduct.price}
                  onChange={(e)=>setUpdateProduct({...updatedProduct, price:e.target.value})}
                ></Input>
                <Input
                  placeholder={"Image URL"}
                  name={"image"}
                  value={updatedProduct.image}
                  onChange={(e)=>setUpdateProduct({...updatedProduct, image:e.target.value})}
                ></Input>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update Product
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default ProductCard;
