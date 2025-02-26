"use client";

type Products = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

import React, { useState } from "react";
import { useData } from "@/hooks/useData";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import Link from "next/link";

function AllProducts() {
  const { Datas } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: string[] = Array.from(
    new Set(Datas?.data?.map((product: Products) => product.category))
  );

  const filteredProducts =
    selectedCategory === null
      ? Datas?.data
      : Datas?.data.filter(
          (product: Products) => product.category === selectedCategory
        );

  const CustomBox = styled(Box)(({ theme }) => ({
    padding: "40px",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",

    alignItems: "stretch",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    justifyContent: "center",

    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      padding: "20px",
      gap: "15px",
    },
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "0 5px rgba(0,0,0,0.5)",

      transition: "all 0.3s ease-in-out",
    },
  }));

  const ImageContainerBox = styled(Box)(({}) => ({
    width: "100%",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
  }));
  const CustomContainer = styled(Container)(({ theme }) => ({
    borderRadius: "7px",
    flexDirection: "column",
    backgroundColor: "#fff",
    minWidth: "250px",
    width: "300px",
    margin: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "0 5px rgba(0,0,0,0.5)",
      transition: "all 0.3s ease-in-out",
      transform: "scale(1.05)",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
      maxWidth: "100%",
    },
  }));

  const CustomButton = styled(Button)(({}) => ({
    fontSize: "14px",
    borderRadius: "7px",
    textTransform: "capitalize",
    border: "2px solid #fff",
    backgroundColor: "#266064",
    color: "#fff",
    letterSpacing: "1px",
    cursor: "pointer",
    display: "block",
    borderColor: "#fff",
    "&:hover": {
      color: "#266064",
      backgroundColor: "#fff",
      borderColor: "#266064",
    },
  }));

  const CategoryButton = styled(Button)(({}) => ({
    fontSize: "14px",
    borderRadius: "7px",
    border: "2px solid #266064",
    textTransform: "capitalize",
    color: "#266064",
    backgroundColor: "#fff",
    display: "block",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#266064",
      color: "#fff",
      borderColor: "#fff",
    },
  }));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          margin: "20px auto",
        }}
      >
        <CategoryButton onClick={() => setSelectedCategory(null)}>
          All
        </CategoryButton>
        {categories.map((category: string) => (
          <CategoryButton
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </Box>

      <CustomBox>
        {filteredProducts?.map((product: Products) => (
          <CustomContainer key={product.id}>
            <Box>
              <ImageContainerBox>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    height: "200px",
                    maxWidth: "100%",
                    marginBottom: "5px",
                    borderRadius: "7px",
                    objectFit: "contain",
                  }}
                />
              </ImageContainerBox>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, fontSize: "14px", fontWeight: "700" }}
                >
                  {product.title}
                </Typography>
                <Typography
                  sx={{ fontWeight: "700", fontSize: "13px", color: "#4C5757" }}
                >
                  $ {product.price}
                </Typography>

                <Link href={`/product/${product.id}`}>
                  <CustomButton>View Details</CustomButton>
                </Link>
              </Box>
            </Box>
          </CustomContainer>
        ))}
      </CustomBox>
    </Box>
  );
}

export default AllProducts;
