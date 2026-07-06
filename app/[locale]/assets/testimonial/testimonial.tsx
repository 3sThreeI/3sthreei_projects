
import { useTranslations } from "next-intl"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import style from "./testimonial.module.css"
import TestimonialForm from "@/components/customComponent/formContact/formTestimonial"
type TestimonialProps = {
    filename: string | any,
    fullname: string,
    message: string
}
export default function Testimonial(feedback: any) {
    const t = useTranslations()
    console.log("feedback: ", feedback)
    const items = feedback ? feedback.feedback as TestimonialProps[] : null
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_IMG_UPLOAD || "http://localhost:8440/uploads/testimonial"
    return (
        <>
            <div className={style.container}>
                <div className={style.logoContainer}>
                    <h1 className={style.logo}>3SThreeI</h1>
                    <h2 className={style.subtitle}>{t('testimonialTitle')}</h2>
                </div>
                {items && items.length > 0 &&
                    <Carousel className={style.carousel} opts={{
                        align: "start",
                        loop: true,
                    }}>
                        <CarouselContent className={style.cards}>
                        {
                            items.map((item, index) => (
                            <CarouselItem className={style.carouselItem} key={index}>
                                <div className={style.card}>
                                    <div className={style.contentText}>
                                        {item.message}
                                    </div>
                                    {
                                        item.filename.url || item.filename
                                            ?
                                            (
                                                <div className={style.imgContainer}>
                                                    <img src={typeof(item.filename) === "object" ? item.filename.url : `${baseUrl}/${item.filename}`} alt={typeof(item.filename) === "object" ? item.filename.url : item.filename} className={style.img} />
                                                    <p className={style.UserName}>{item.fullname}</p>
                                                </div>
                                            ) :
                                            // if the image is not available we will display empty card with design
                                            (
                                                <div className={style.imgContainer}>
                                                    <div className={style.cardImage}></div>
                                                    <p className={style.UserName}>{item.fullname}</p>
                                                </div>
                                            )
                                    }
                                </div>

                            </CarouselItem>
                            ))
                        }
                        </CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                }
                <div className="">
                    <TestimonialForm />
                </div>
            </div>
        </>
    )
}