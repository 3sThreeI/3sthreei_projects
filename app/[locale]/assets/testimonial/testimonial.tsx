import { useTranslations } from "next-intl"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import style from "./testimonial.module.css"
type TestimonialProps = {
    imgUrl: string | null,
    name: string,
    text: string
}
export default function Testimonial() {
    const t = useTranslations()
    const items = t.raw('testimonial') as TestimonialProps[]
    return (
        <>
            <div className={style.container}>
                <div className={style.logoContainer}>
                    <h1 className={style.logo}>3SThreeI</h1>
                    <h2 className={style.subtitle}>What Our Clients Say About Us</h2>
                </div>
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
                                            {item.text}
                                        </div>
                                        {
                                            item.imgUrl && item.imgUrl.length > 0
                                                ?
                                                (
                                                    <div className={style.imgContainer}>
                                                        <img src="#" alt="" className={style.img}/>
                                                         <p className={style.UserName}>{item.name}</p>
                                                    </div>
                                                ) :
                                                // if the image is not available we will display empty card with design
                                                (
                                                    <div className={style.imgContainer}>
                                                        <div className={style.cardImage}></div>
                                                        <p className={style.UserName}>{item.name}</p>
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
            </div>
        </>
    )
}