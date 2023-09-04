    package com.tutorial.apidemo.ecommerce.backend.entity;


    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import org.hibernate.generator.Generator;

    @Entity
    @Table(name = "address")
    public class Address {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "name")
        private String name;

        @Column(name = "phone")
        private String phone;

        @Column(name = "city")
        private String city;

        @Column(name = "district")
        private String district;

        @Column(name = "ward")
        private String ward;

        @Column(name = "street")
        private String street;

        @ManyToOne
        @JoinColumn(name = "user_id")
        @JsonIgnore
        private User user;

        public Address() {}

        public Address(String name, String phone, String city, String district, String ward, String street, User user) {
            this.name = name;
            this.phone = phone;
            this.city = city;
            this.district = district;
            this.ward = ward;
            this.street = street;
            this.user = user;
        }

        public Long getId() {return id;}

        public void setId(Long id) {this.id = id;}

        public String getName() {return name;}

        public void setName(String name) {this.name = name;}

        public String getPhone() {return phone;}

        public void setPhone(String phone) {this.phone = phone;}

        public String getCity() {return city;}

        public void setCity(String city) {this.city = city;}

        public String getDistrict() {return district;}

        public void setDistrict(String district) {this.district = district;}

        public String getWard() {return ward;}

        public void setWard(String ward) {this.ward = ward;}

        public String getStreet() {return street;}

        public void setStreet(String street) {this.street = street;}

        public User getUser() {return user;}

        public void setUser(User user) {this.user = user;}
    }
