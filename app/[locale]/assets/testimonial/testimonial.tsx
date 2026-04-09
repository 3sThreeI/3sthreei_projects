import { useTranslations } from "next-intl"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import style from "./testimonial.module.css"
type TestimonialProps = {
    imgUrl: string,
    contentText: string
}
export default function Testimonial() {
    const t = useTranslations()
    const items = t.raw('testimonial') as TestimonialProps[]
    return (
        <>
            <div className={style.conatainer}>
                <h1 className={style.logo}>3SThreeI</h1>
                <h2 className={style.title}>What Our Clients Say About Us</h2>
                <Carousel>
                    <CarouselContent className={style.cards}>
                        {
                            items.map((item, index) => (
                                <CarouselItem key={index}>
                                    {
                                        item.imgUrl && item.imgUrl.length > 0
                                            ?
                                            (
                                                <div className={style.img}>
                                                    <img src="#" alt="" />
                                                </div>
                                            ) : 
                                            // if the image is not available we will display empty card with design
                                            (
                                                <div className={style.img}>
                                                    <div className={style.cardImage}></div>
                                                </div>
                                            )
                                    }

                                    <div className={style.contentText}>
                                        {item.contentText}
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