package nl.novi.closette.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


public class NewsPostRequestDto {

        // attributen

        @NotBlank
        @Size(min=1, max=100)
        private String title;

        @NotBlank
        @Size(min=1, max=255, message="Introduction paragraph is too long, 255 characters maximum.")
        private String description;

        @NotBlank
        @Column(columnDefinition="text")
        @Size(min=10, message="Paragraph is too short, minimum of 10 characters.")
        private String paragraph;

        private String postTime;

        // getters and setters


        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public String getDescription() {
                return description;
        }

        public void setDescription(String description) {
                this.description = description;
        }

        public String getParagraph() {
                return paragraph;
        }

        public void setParagraph(String paragraph) {
                this.paragraph = paragraph;
        }

        public String getPostTime() {
                return postTime;
        }

        public void setPostTime(String postTime) {
                this.postTime = postTime;
        }
}
