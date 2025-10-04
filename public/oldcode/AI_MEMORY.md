# AI Memory Documentation

## Product Management Updates

### Secure Checkout Image Cache Fix
**Date**: Current Session
**Issue**: Updated secure-checkout.png image not appearing on server due to browser caching
**Solution**: Added cache-busting parameter `?v=2` to image URLs
**Size Updates**: 
- Initial increase: 200x32px to 280x45px (40% larger)
- Final increase: 280x45px to 392x63px (additional 40% larger)
- **Total increase**: 96% larger than original size
**Files Updated**:
- `/src/app/checkout/page.tsx` - Updated both image references with larger dimensions
- `/src/components/Footer.tsx` - Updated footer image reference with larger dimensions
**Technical Note**: Browser caching prevents updated static assets from loading. Cache-busting parameters force browser to reload assets.
**CSS Classes**: Updated from `h-8` to `h-11` to `h-16` for proper height scaling

### Establishment Address Update
**Date**: Current Session
**Change**: Updated establishment address from Columbus, OH to Haverford, PA
**New Address**: 315 Lancaster Avenue, Haverford, PA 19041, USA
**Files Updated**:
- `/src/app/about/page.tsx` - Contact Information section
- `/src/app/contact/page.tsx` - Our Location section
- `/src/app/privacy-policy/page.tsx` - Contact Information section
- `/src/components/Footer.tsx` - Footer address display
**Note**: Address consistently updated across all public-facing pages

### Canon PowerShot G7 X Mark II Camera Addition
**Date**: Current Session
**Product Slug**: `canon-powershot-g7-x-mark-ii-digital-camera-20-1mp`
**Actions Taken**:
- Updated product JSON file with Canon camera title and specifications
- Counted and verified 7 JPEG images in public folder
- Set price to $227.00 as specified
- Updated description highlighting 4K video capability and vlog features
- Listed all included accessories (2 batteries, Manfrotto tripod, charger, wrist strap)
- Set appropriate electronics category for digital cameras
- Updated SEO metadata for camera-specific keywords

### Ray-Ban Meta Wayfarer Smart Glasses Addition
**Date**: Current Session
**Product Slug**: `ray-ban-meta-wayfarer-standard-smart-glasses-shiny-black-clear`
**Actions Taken**:
- Updated product JSON file with correct title, description, and pricing
- Verified and updated image paths (10 JPEG images total)
- Set appropriate category for smart glasses
- Updated SEO metadata for search optimization

### Checkout Component Enhancement
**Date**: Current Session
**Component**: `/src/app/checkout/page.tsx`
**Actions Taken**:
- Added complete list of Netherlands provinces to checkout form
- Added `netherlandsProvinces` array with all 12 provinces:
  - Drenthe, Flevoland, Friesland, Gelderland, Groningen, Limburg
  - North Brabant, North Holland, Overijssel, South Holland, Utrecht, Zeeland
- Updated `allRegions` array to include Netherlands provinces
- Now supports province suggestions for US, Canada, UK, Australia, and Netherlands

## Technical Notes

### Product JSON Structure
- All product data located in `src/lib/products-raw/[slug]/product.json`
- Images stored in `public/products/[slug]/` directory
- Image file extensions must match actual files (JPEG, PNG, WEBP)
- Always count actual images in public folder before updating JSON

### Checkout Form Province Support
- State/Province suggestions filter based on user input (minimum 2 characters)
- Supports autocomplete for all major English-speaking countries plus Netherlands
- Form validates required fields and phone numbers
- Email integration for shipping notifications

## Context for Future Sessions
- Project uses Next.js 15 with TypeScript
- Tailwind CSS for styling
- Product images must be counted and referenced correctly
- Netherlands is now fully supported in checkout province selection