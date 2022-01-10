import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import "./SearchPage.css"
import Header from "../../components/header/Header";
import TopNav from "../../components/topnav/TopNav";
import InputField from "../../components/form-elements/inputfield/InputField";
import Slider from "../../components/form-elements/slider/Slider";
import BackButton from "../../components/buttons/BackButton";

function SearchPage() {
    // we declareren het formulier altijd op de pagina, niet in de InputComponenten
    const {register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        document.title = "Zoeken :: Closette"
    }, []);

    function onFormSubmit(data) {
        console.log("Zoek data:");
        console.log(data);
    }

    console.log(errors);

    return (
        <section className="search__page">
            <TopNav/>
            <Header
                title="Zoeken"/>
            <form className="form-container" onSubmit={handleSubmit(onFormSubmit)}>
                <InputField
                    errors={errors}
                    register={register}
                    labelText="Stad"
                    labelId="city-field"
                    inputName="city"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Stad invullen is verplicht. Vul aub iets in",
                        },
                        minLength: {
                            value: 1,
                            message: "Je moet meer invullen"
                        }
                    }}
                />

                <InputField
                    errors={errors}
                    register={register}
                    labelText="Land"
                    labelId="country-field"
                    inputName="country"
                    validationRules={{
                        maxLength: {
                            value: 50,
                            message: "Te lang"
                        }
                    }}
                />

                <section className="checkbox-filters">
                <Slider
                    errors={errors}
                    register={register}
                    labelId="genderneutraal-check"
                    inputName="genderneutraal"
                    filterAttribute="Genderneutraal"
                    yes="wel"
                    no="niet"
                >

                </Slider>

                <Slider
                    errors={errors}
                    register={register}
                    labelId="free-check"
                    inputName="free"
                    filterAttribute="Gratis"
                    yes="wel"
                    no="niet"
                >

                </Slider>

                <Slider
                    errors={errors}
                    register={register}
                    labelId="accessible-check"
                    inputName="accessible"
                    filterAttribute="Invalidentoilet"
                    yes="wel"
                    no="niet"
                >

                </Slider>

                <Slider
                    errors={errors}
                    register={register}
                    labelId="cleanliness-check"
                    inputName="cleanliness"
                    filterAttribute="Schoon"
                    yes="wel"
                    no="vies"
                >

                </Slider>

                <Slider
                    errors={errors}
                    register={register}
                    labelId="public-check"
                    inputName="public"
                    filterAttribute="Openbaar"
                    yes="wel"
                    no="niet"
                >

                </Slider>

                <Slider
                    errors={errors}
                    register={register}
                    labelId="has_photo-check"
                    inputName="has_photo"
                    filterAttribute="Met foto"
                    yes="wel"
                    no="zonder"
                />

                <Slider
                    errors={errors}
                    register={register}
                    labelId="latitude-check"
                    inputName="latitude"
                    filterAttribute="Breedtegraad (latitude)"
                >
                    Link <Link to="/dashboard">naar f.a.q.</Link>
                </Slider>

                <Slider
                    errors={errors}
                    register={register}
                    labelId="longitude-check"
                    inputName="longitude"
                    filterAttribute="Lengtegraad (longitude)"
                >
                    Link <Link to="/dashboard">naar f.a.q.</Link>
                </Slider>

                    <Slider
                        errors={errors}
                        register={register}
                        labelId="has_rating-check"
                        inputName="has_rating"
                        filterAttribute="Met sterren"
                    />

                    <Slider
                        errors={errors}
                        register={register}
                        labelId="has_description-check"
                        inputName="has_description"
                        filterAttribute="Heeft beschrijving"
                    />

                    <Slider
                        errors={errors}
                        register={register}
                        labelId="has_opening_hours-check"
                        inputName="has_opening_hours"
                        filterAttribute="Openingstijden"
                    />


                </section>

                <button type="submit">
                    Zoeken
                </button>
            </form>
            <BackButton />
            <p>
                Link <Link to="/searchresults">naar Zoekresultaten Pagina</Link>
            </p>
        </section>
    );
}

export default SearchPage;