# Comprehensive Game Database Schema

This document provides a detailed overview of the schema for tracking information related to **Games**, **Platforms**, **Genres**, **Reviews**, **Releases**, **Critics**, and more. It includes tables for game details, box art, review scores, game versions, and associated metadata.

---

## 1. **Games** Table

Stores general information about a game.

| Field Name     | Data Type    | Description                                       |
| -------------- | ------------ | ------------------------------------------------- |
| `game_id`      | INT          | Primary key, unique ID for the game               |
| `title`        | VARCHAR(255) | Title of the game                                 |
| `description`  | TEXT         | Brief description of the game                     |
| `release_date` | DATETIME     | Date of initial release                           |
| `publisher_id` | INT          | Foreign key referencing `Publishers.publisher_id` |
| `developer_id` | INT          | Foreign key referencing `Developers.developer_id` |

---

## 2. **Consoles/Platforms** Table

Stores information about gaming consoles and platforms.

| Field Name      | Data Type    | Description                                    |
| --------------- | ------------ | ---------------------------------------------- |
| `platform_id`   | INT          | Primary key, unique ID for the platform        |
| `platform_name` | VARCHAR(255) | Name of the platform (e.g., PS4, Xbox One, PC) |

---

## 3. **Genres** Table

Stores information about game genres.

| Field Name   | Data Type    | Description                                     |
| ------------ | ------------ | ----------------------------------------------- |
| `genre_id`   | INT          | Primary key, unique ID for the genre            |
| `genre_name` | VARCHAR(255) | Name of the genre (e.g., Action, RPG, Strategy) |

---

## 4. **Game_Genres** Table

Links games to genres.

| Field Name | Data Type | Description                               |
| ---------- | --------- | ----------------------------------------- |
| `game_id`  | INT       | Foreign key referencing `Games.game_id`   |
| `genre_id` | INT       | Foreign key referencing `Genres.genre_id` |

---

## 5. **Publishers** Table

Stores information about game publishers.

| Field Name       | Data Type    | Description                               |
| ---------------- | ------------ | ----------------------------------------- |
| `publisher_id`   | INT          | Primary key, unique ID for the publisher  |
| `publisher_name` | VARCHAR(255) | Name of the publisher                     |
| `publisher_url`  | VARCHAR(255) | URL to the publisher's website or profile |

---

## 6. **Developers** Table

Stores information about game developers.

| Field Name       | Data Type    | Description                               |
| ---------------- | ------------ | ----------------------------------------- |
| `developer_id`   | INT          | Primary key, unique ID for the developer  |
| `developer_name` | VARCHAR(255) | Name of the developer                     |
| `developer_url`  | VARCHAR(255) | URL to the developer's website or profile |

---

## 7. **Game_Developers** Table

Links games to their developers.

| Field Name     | Data Type | Description                                       |
| -------------- | --------- | ------------------------------------------------- |
| `game_id`      | INT       | Foreign key referencing `Games.game_id`           |
| `developer_id` | INT       | Foreign key referencing `Developers.developer_id` |

---

## 8. **Game_Consoles** Table

Links games to supported platforms.

| Field Name    | Data Type | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| `game_id`     | INT       | Foreign key referencing `Games.game_id`        |
| `platform_id` | INT       | Foreign key referencing `Consoles.platform_id` |

---

## 9. **Regions** Table

Stores information about regions where games are released.

| Field Name    | Data Type    | Description                                      |
| ------------- | ------------ | ------------------------------------------------ |
| `region_id`   | INT          | Primary key, unique ID for the region            |
| `region_name` | VARCHAR(255) | Name of the region (e.g., North America, Europe) |

---

## 10. **Game_Regions** Table

Links games to their release regions.

| Field Name  | Data Type | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `game_id`   | INT       | Foreign key referencing `Games.game_id`     |
| `region_id` | INT       | Foreign key referencing `Regions.region_id` |

---

## 11. **Ratings** Table

Stores ratings for games.

| Field Name     | Data Type    | Description                             |
| -------------- | ------------ | --------------------------------------- |
| `rating_id`    | INT          | Primary key, unique ID for the rating   |
| `game_id`      | INT          | Foreign key referencing `Games.game_id` |
| `rating_value` | DECIMAL(3,1) | Rating value (e.g., 8.5 out of 10)      |

---

## 12. **Screenshots** Table

Stores URLs of game screenshots.

| Field Name      | Data Type    | Description                               |
| --------------- | ------------ | ----------------------------------------- |
| `screenshot_id` | INT          | Primary key, unique ID for the screenshot |
| `game_id`       | INT          | Foreign key referencing `Games.game_id`   |
| `image_url`     | VARCHAR(255) | URL to the image of the screenshot        |

---

## 13. **Box Art** Table

Stores information about a game's box art images.

| Field Name   | Data Type                                | Description                             |
| ------------ | ---------------------------------------- | --------------------------------------- |
| `box_art_id` | INT                                      | Primary key, unique ID for the box art  |
| `game_id`    | INT                                      | Foreign key referencing `Games.game_id` |
| `image_url`  | VARCHAR(255)                             | URL to the image of the box art         |
| `image_type` | ENUM('front', 'back', 'spine', 'inside') | Type of the box art image               |

---

## 14. **Game_Versions** Table

Stores information about different versions of a game.

| Field Name     | Data Type    | Description                                        |
| -------------- | ------------ | -------------------------------------------------- |
| `version_id`   | INT          | Primary key, unique ID for the version             |
| `game_id`      | INT          | Foreign key referencing `Games.game_id`            |
| `version_name` | VARCHAR(255) | Name or version of the game (e.g., "Gold Edition") |
| `release_date` | DATETIME     | Date the version was released                      |

---

## 15. **Game_Trailers** Table

Stores information about game trailers.

| Field Name     | Data Type    | Description                                     |
| -------------- | ------------ | ----------------------------------------------- |
| `trailer_id`   | INT          | Primary key, unique ID for the trailer          |
| `game_id`      | INT          | Foreign key referencing `Games.game_id`         |
| `video_url`    | VARCHAR(255) | URL to the trailer video                        |
| `trailer_type` | VARCHAR(255) | Type of the trailer (e.g., Gameplay, Cinematic) |

---

## 16. **Critics** Table

Stores information about critics who review games.

| Field Name    | Data Type    | Description                           |
| ------------- | ------------ | ------------------------------------- |
| `critic_id`   | INT          | Primary key, unique ID for the critic |
| `critic_name` | VARCHAR(255) | Name of the critic or publication     |
| `bio`         | TEXT         | Bio or description of the critic      |

---

## 17. **Reviews** Table

Stores reviews written by users or critics.

| Field Name         | Data Type    | Description                                                 |
| ------------------ | ------------ | ----------------------------------------------------------- |
| `review_id`        | INT          | Primary key, unique ID for the review                       |
| `game_id`          | INT          | Foreign key referencing `Games.game_id`                     |
| `user_id`          | INT          | Foreign key referencing `Users.user_id` (if applicable)     |
| `rating`           | DECIMAL(3,1) | Overall rating for the game                                 |
| `review_text`      | TEXT         | Text content of the review                                  |
| `review_date`      | DATETIME     | Date when the review was written                            |
| `helpful_count`    | INT          | Number of users who found the review helpful                |
| `is_critic_review` | BOOLEAN      | Indicates if the review is from a critic                    |
| `critic_id`        | INT          | Foreign key referencing `Critics.critic_id` (if applicable) |

---

## 18. **Review_Scores** Table

Stores category-specific ratings for a review.

| Field Name        | Data Type                                                                                  | Description                                       |
| ----------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `review_score_id` | INT                                                                                        | Primary key, unique ID for the review score entry |
| `review_id`       | INT                                                                                        | Foreign key referencing `Reviews.review_id`       |
| `score_type`      | ENUM('graphics', 'gameplay', 'sound', 'story', 'controls', 'value', 'music', 'difficulty') | Category of the score                             |
| `score`           | DECIMAL(3,1)                                                                               | Score given for the specific category             |

---

## 19. **Review_Comments** Table

Stores comments made on reviews.

| Field Name     | Data Type | Description                                             |
| -------------- | --------- | ------------------------------------------------------- |
| `comment_id`   | INT       | Primary key, unique ID for the comment                  |
| `review_id`    | INT       | Foreign key referencing `Reviews.review_id`             |
| `user_id`      | INT       | Foreign key referencing `Users.user_id` (if applicable) |
| `comment_text` | TEXT      | Content of the comment                                  |
| `comment_date` | DATETIME  | Date when the comment was posted                        |

---

## 20. **Releases** Table

Stores information about a game's release across different platforms and regions.

| Field Name     | Data Type                                                            | Description                                            |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------------ |
| `release_id`   | INT                                                                  | Primary key, unique ID for the release                 |
| `game_id`      | INT                                                                  | Foreign key referencing `Games.game_id`                |
| `platform_id`  | INT                                                                  | Foreign key referencing `Consoles.platform_id`         |
| `region_id`    | INT                                                                  | Foreign key referencing `Regions.region_id`            |
| `release_date` | DATETIME                                                             | Date when the game was released                        |
| `version`      | VARCHAR(50)                                                          | Version of the release (e.g., "1.0", "Director's Cut") |
| `release_type` | ENUM('retail', 'digital', 'special_edition', 're-release', 'bundle') | Type of release                                        |
| `price`        | DECIMAL(10,2)                                                        | Price of the game at the time of release               |
| `rating`       | DECIMAL(3,1)                                                         | Rating of the release (if available)                   |
| `notes`        | TEXT                                                                 | Additional notes about the release                     |

---

## Conclusion

This schema structure provides a comprehensive way to track a wide variety of data related to games, including their platforms, genres, releases, reviews, and more. The separation of data into individual tables ensures flexibility, scalability, and ease of management.

---

## Example SQL Queries

### Retrieve All Reviews for a Specific Game

```sql
SELECT r.review_id, r.game_id, r.rating, r.review_text, r.review_date, c.critic_name
FROM Reviews r
LEFT JOIN Critics c ON r.critic_id = c.critic_id
WHERE r.game_id = 7139;
```

### Retrieve Latest Release for a Game

```sql
SELECT r.release_id, r.platform_id, r.region_id, r.release_date, r.version, r.release_type, r.price, r.rating, r.notes
FROM Releases r
WHERE r.game_id = 7139
ORDER BY r.release_date DESC
LIMIT 1;
```

### Retrieve Reviews with Category-Specific Scores

```sql
SELECT rs.score_type, rs.score
FROM Review_Scores rs
WHERE rs.review_id = 1;
```
