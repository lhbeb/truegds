import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/data';

// @ts-expect-error Next.js app directory API routes do not support typing the params argument yet
export async function GET(request: Request, { params }) {
  try {
    const { slug } = params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(`Failed to get product ${params?.slug}:`, error);
    return NextResponse.json(
      { error: 'Failed to retrieve product' },
      { status: 500 }
    );
  }
} 