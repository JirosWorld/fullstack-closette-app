package com.jirosworld.closette.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

        @Id
        @Column(nullable = false, unique = true)
        private String username;

        @Column(nullable = false)
        private String password;

        @Column(nullable = false)
        private boolean enabled = true;

        private String email;

        @OneToMany(
                targetEntity = Authority.class,
                mappedBy = "username",
                cascade = CascadeType.ALL,
                orphanRemoval = true,
                fetch = FetchType.EAGER)
        private Set<Authority> authorities = new HashSet<>();


        @OneToMany(mappedBy = "newsauthor", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
        private List<NewsPost> newsposts = new ArrayList<>();


        @OneToMany(mappedBy = "user")
        @JsonIgnore
        private List<Rating> ratings = new ArrayList<>();


        // getters and setters

        public String getUsername() {
                return username;
        }

        public void setUsername(String username) {
                this.username = username;
        }

        public List<NewsPost> getNewsposts() {
                return newsposts;
        }

        public void setNewsposts(List<NewsPost> newsposts) {
                this.newsposts = newsposts;
        }

        public String getPassword() {
                return password;
        }

        public void setPassword(String password) {
                this.password = password;
        }

        public boolean isEnabled() {
                return enabled;
        }

        public void setEnabled(boolean enabled) {
                this.enabled = enabled;
        }

        public String getEmail() {
                return email;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public Set<Authority> getAuthorities() { return authorities; }
        public void setAuthorities(Set<Authority> authorities) { this.authorities = authorities; }

        public void addAuthority(Authority authority) {
                this.authorities.add(authority);
        }
        public void addAuthority(String authorityString) {
                this.authorities.add(new Authority(this.username, authorityString));
        }
        public void removeAuthority(Authority authority) {
                this.authorities.remove(authority);
        }
        public void removeAuthority(String authorityString) {
                this.authorities.removeIf(authority -> authority.getAuthority().equalsIgnoreCase(authorityString));
        }

        // relation tables

        public List<Rating> getRatings() {
                return ratings;
        }

        public void setRatings(List<Rating> ratings) {
                this.ratings = ratings;
        }
}
