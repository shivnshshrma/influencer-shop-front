# InfluStyle Backend API

A comprehensive backend API for the InfluStyle platform, built with Node.js, Express, and Supabase.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Complete user profiles with measurements and preferences
- **Content Management**: Posts creation and management for influencers
- **Wishlist System**: Save and manage favorite products
- **Recommendations**: Personalized content recommendations
- **Influencer Discovery**: Find and follow influencers
- **Security**: Rate limiting, input validation, and secure headers

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer + Cloudinary (optional)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Supabase URL and keys
- JWT secret
- Cloudinary credentials (optional)
- Other configuration options

4. Run database migrations:
```bash
# Apply the migration to your Supabase project
# Copy the SQL from supabase/migrations/001_initial_schema.sql
# and run it in your Supabase SQL editor
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "gender": "male"
}
```

#### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user information (requires authentication).

### User Endpoints

#### GET /api/users/profile
Get user profile with measurements.

#### PUT /api/users/profile
Update user profile.

#### PUT /api/users/measurements
Update user measurements.

#### POST /api/users/upgrade-to-influencer
Upgrade user account to influencer.

### Posts Endpoints

#### GET /api/posts
Get all published posts (with pagination).

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `category`: Filter by category
- `influencer_id`: Filter by influencer

#### POST /api/posts
Create a new post (influencers only).

#### GET /api/posts/my/posts
Get current user's posts.

#### PUT /api/posts/:id
Update a post.

#### DELETE /api/posts/:id
Delete a post.

### Wishlist Endpoints

#### GET /api/wishlist
Get user's wishlist items.

#### POST /api/wishlist
Add item to wishlist.

#### DELETE /api/wishlist/:postId
Remove item from wishlist.

### Influencer Endpoints

#### GET /api/influencers
Get all influencers.

#### GET /api/influencers/:id
Get specific influencer profile.

#### GET /api/influencers/:id/posts
Get influencer's posts.

### Recommendation Endpoints

#### GET /api/recommendations/personalized
Get personalized recommendations for authenticated user.

#### GET /api/recommendations/trending
Get trending posts.

#### GET /api/recommendations/influencers
Get recommended influencers.

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional details (optional)"
}
```

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Joi schema validation
- **Password Hashing**: bcrypt with salt rounds
- **JWT**: Secure token-based authentication

## Database Schema

The database includes the following main tables:
- `users`: User accounts and profiles
- `user_measurements`: Body measurements and preferences
- `posts`: Content created by influencers
- `wishlist_items`: User's saved items
- `follows`: User follow relationships

## Development

### Running Tests
```bash
npm test
```

### Code Style
The project uses ESLint and Prettier for code formatting.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3001) |
| `NODE_ENV` | Environment | No (default: development) |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | No (default: 7d) |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure proper CORS origins
4. Set up SSL/TLS
5. Configure rate limiting
6. Set up monitoring and logging
7. Configure backup strategy

### Deployment Platforms

The API can be deployed to:
- **Vercel**: Serverless deployment
- **Railway**: Container deployment
- **Heroku**: Platform as a Service
- **DigitalOcean**: VPS deployment
- **AWS/GCP/Azure**: Cloud platforms

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.