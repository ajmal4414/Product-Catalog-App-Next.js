"use client";

import React from "react";
import { useDetail } from "@/hooks/useData";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Link from "next/link";

import { cartAtom } from "@/atoms/cartAtom";
import { useSetAtom } from "jotai";

function ProductDetails() {
  const params = useParams();
  const productId = params?.productId as string;
  const router = useRouter();
  const { data: productDetail, isLoading, error } = useDetail(productId);
  const setCart = useSetAtom(cartAtom);

  if (isLoading) return <Typography>Loading ...</Typography>;
  if (error) return <Typography>Error Loading Product</Typography>;

  const handleAddToCart = () => {
    if (!productDetail) return;
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === productDetail.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productDetail.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        );
      }
      return [
        ...prevCart,
        { ...productDetail, quantity: 1, totalPrice: productDetail.price },
      ];
    });

    router.push("/cart");
  };

  const CustomBox = styled(Box)(({}) => ({
    display: "flex",
    padding: "40px",
    margin: "0 auto",
  }));

  const CustomContainer = styled(Container)(({}) => ({
    display: "flex",
    flexDirection: "row",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    borderRadius: "7px",
    maxWidth: "800px",
  }));

  const ImageContainerBox = styled(Box)(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    padding: "20px",
  }));

  const StyledImage = styled("img")(({}) => ({
    width: "auto",
    height: "250px",
    borderRadius: "7px",
  }));

  const ProductTextBox = styled(Box)(({}) => ({
    marginTop: "2rem",
    flexDirection: "column",
    marginLeft: "20px",
    display: "flex",
  }));

  const CustomButton = styled(Button)(({}) => ({
    fontSize: "14px",
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "2px solid #fff",
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    textTransform: "capitalize",
    padding: "10px 20px",
    borderRadius: "7px",
    marginTop: "1.5rem",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#ff9800",
      borderColor: "#ff9800",
    },
  }));
  return (
    <CustomBox>
      {productDetail && (
        <CustomContainer>
          <Box key={productDetail.id}>
            <ImageContainerBox>
              <StyledImage
                src={productDetail.image}
                alt={productDetail.title}
              />
            </ImageContainerBox>
            <ProductTextBox>
              <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
                {productDetail.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#585050",
                  fontWeight: 600,
                  my: 1,
                }}
              >
                $ {productDetail.price}
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  textTransform: "capitalize",
                  mt: 1,
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                {productDetail.description}
              </Typography>
              <Typography
                sx={{ fontSize: "14px", color: "#222", my: 1, fontWeight: 700 }}
              >
                {productDetail.rating.rate} ({productDetail.rating.count}{" "}
                reviews)
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {productDetail.category}
              </Typography>
            </ProductTextBox>
            <Link href="/cart">
              <CustomButton onClick={handleAddToCart}>add to cart</CustomButton>
            </Link>
          </Box>
        </CustomContainer>
      )}
    </CustomBox>
  );
}

export default ProductDetails;
