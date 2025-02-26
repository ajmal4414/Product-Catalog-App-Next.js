"use client";
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  totalPrice: number;
};
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { cartAtom } from "@/atoms/cartAtom";
import { useAtom } from "jotai";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import Link from "next/link";

const CustomBox = styled(Box)(({}) => ({
  display: "grid",
  margin: "0 auto",
  padding: "40px",
  boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
}));

const CustomContainer = styled(Container)(({ theme }) => ({
  gap: theme.spacing(3),
  width: "100%",
  maxWidth: "md",
}));

const CartItemBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderBottom: "0.25px dotted #333",
  width: "100%",
  borderWidth: "100%",
  flexWrap: "wrap",
}));

const ImageContainerBox = styled(Box)(({}) => ({
  flexShrink: "0",
}));

const StyledImage = styled("img")(({}) => ({
  height: "auto",
  width: "100%",
  maxWidth: "150px",
  objectFit: "contain",
  margin: "0 auto",
}));

const CartTextBox = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
}));
const HomeButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  padding: "10px 20px",
  color: "#266064",
  marginTop: theme.spacing(2),
  backgroundColor: "#fff",
  border: "1px solid #fff",
  letterSpacing: "1px",
  display: "block",
  margin: "0 auto",
  cursor: "pointer",
  borderRadius: "7px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#266064",
    color: "#fff",
    borderColor: "#fff",
  },
}));

function Cart() {
  const [cart, setCart] = useAtom<Product[]>(cartAtom);

  const removeFromCart = (id: number): void => {
    setCart(cart.filter((item: Product) => item.id !== id));
  };

  const incrementQuantity = (id: number): void => {
    setCart((prevCart: Product[]) =>
      prevCart.map((item: Product) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: (item.quantity + 1) * item.price,
            }
          : item
      )
    );
  };
  const decrementQuantity = (id: number) => {
    setCart((prevCart: Product[]) =>
      prevCart
        .map((item: Product) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: (item.quantity - 1) * item.price,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const cartTotal = cart.reduce(
    (acc, item: Product) => acc + item.totalPrice,
    0
  );

  return (
    <CustomBox>
      <CustomContainer>
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#587A8D",
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          Shopping Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography
            sx={{
              fonSize: "32px",
              fontWeight: "700",
              color: "#587abd",
              letterSpacing: "0.5px",
              my: 3,
              textAlign: "center",
              textTransform: "capitalize",
              llineHeight: "1px",
            }}
          >
            cart is empty
          </Typography>
        ) : (
          <>
            <Box>
              <Link href="/">
                <HomeButton>back to home</HomeButton>
              </Link>
            </Box>
            {cart.map((item: Product) => (
              <CartItemBox key={item.id} sx={{ mt: 4 }}>
                <ImageContainerBox>
                  <StyledImage src={item.image} alt="" />
                </ImageContainerBox>
                <CartTextBox sx={{}}>
                  <Typography sx={{ my: 1, fontSize: "18px", fontWeight: 700 }}>
                    {item.title}
                  </Typography>

                  <Typography sx={{ color: "#665252", fontWeight: 600, my: 1 }}>
                    Price: $ {item.price}
                  </Typography>
                </CartTextBox>
                <Box sx={{ display: "flex", gap: "1rem", mb: 2 }}>
                  <Button
                    sx={{ color: "#1D5E86", minWidth: "40px", padding: "5px" }}
                    onClick={() => incrementQuantity(item.id)}
                  >
                    <AddIcon />
                  </Button>
                  <Typography sx={{ mt: 1 }}>{item.quantity}</Typography>
                  <Button
                    sx={{ color: "#1D5E86", minWidth: "40px", padding: "5px" }}
                    onClick={() => decrementQuantity(item.id)}
                  >
                    <RemoveIcon />
                  </Button>
                  <Button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </Box>
              </CartItemBox>
            ))}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
                Total:
              </Typography>
              <Typography
                sx={{ fontWeight: "700", fonSize: "18px", color: "#afafaf" }}
              >
                $ {cartTotal.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </CustomContainer>
    </CustomBox>
  );
}

export default Cart;
