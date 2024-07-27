import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

 const addItemToCart = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    // If no cart exists, create a new one
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    let cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (cartItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    res.status(200).json({ message: 'Item added to cart', cartItem });
  } catch (err: any) {
    console.error('err:', err);
    res.status(500).json({ err: err.message });
  }
};

 const removeItemFromCart = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { cartItemId } = req.params;

  try {
   
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: parseInt(cartItemId),
        cart: { userId },
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Remove the item from the cart
    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    });

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err: any) {
    console.error('err:', err);
    res.status(500).json({ err: err.message });
  }
};

 const viewCart = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (err:any) {
    console.error('err:', err);
    res.status(500).json({ err: err.message });
  }
};

 export {addItemToCart, viewCart, removeItemFromCart}