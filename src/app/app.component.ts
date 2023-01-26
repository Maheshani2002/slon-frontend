import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth/auth-service.service';
import { Router } from '@angular/router';
import { Review } from 'src/models/review';
import { ReviewService } from './services/review/review.service';
import { AppointmentServiceService } from './services/appointment/appointment-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ItemServiceService } from './services/item/item-service.service';
import { Item } from 'src/models/item';
import Pusher from 'pusher-js';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/models/appointment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'salon_app';
  name = "";
  reviews: Array<Review> = []
  items: Array<Item> = []
  appointments: Array<Appointment> = []
  closeResult = '';
  activeTitle = '';
  activeIndex = -1;
  shouldShowAvailableTimes: boolean = false;
  selectedTime: string = "";
  activeList = [{
    "name": "Add reborn",
    "image": "https://media.glamourmagazine.co.uk/photos/6380b816bd385320035893b1/4:3/w_1920,h_1440,c_limit/CURLY%20HAIRSTYLES%2024112022-sq.jpg",
    "price": 10000,
  },]
  hairServices = [
    {
      "name": "Add reborn",
      "image": "https://media.glamourmagazine.co.uk/photos/6380b816bd385320035893b1/4:3/w_1920,h_1440,c_limit/CURLY%20HAIRSTYLES%2024112022-sq.jpg",
      "price": 10000,
    },
    {
      "name": "Perming",
      "image": "https://glowsly.com/wp-content/uploads/2017/08/long_curly_hairstyles_ideas.jpg",
      "price": 5000,
    },
    {
      "name": "Hair straight",
      "image": "https://i.pinimg.com/736x/c0/3f/8c/c03f8c4d64f987eda0a7fb04282ca04f.jpg",
      "price": 2000,
    },
  ];
  predicureServices = [
    {
      "name": "",
      "image": "https://image9.photobiz.com/5536/27_20191023092000_6705662_large.jpg",
      "price": 1200,
    },
    {
      "name": "",
      "image": "https://tinasnaturalnails.com/wp-content/uploads/pedi2.jpg",
      "price": 1200,
    },
    {
      "name": "",
      "image": "https://purepeninsulaspa.com/wp-content/uploads/2021/01/Add-On-Services.jpg",
      "price": 1200,
    },
  ];
  manicureServices = [
    {
      "name": "",
      "image": "https://s3-ap-southeast-1.amazonaws.com/lovely-news/cover-m/222785ca-e091-46c3-8788-bf1f4992b6bc/mobile-manicure-services-for-the-lazy-girl.jpg",
      "price": 1000,
    },
    {
      "name": "",
      "image": "https://nailspa.lk/wp-content/uploads/2022/05/manicurist-master-makes-manicure-woman-s-hands-spa-treatment-concept-scaled.jpg",
      "price": 1000,
    },
    {
      "name": "",
      "image": "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_500,h_348/https://aboutfacesdayspa.com/wp-content/uploads/2016/09/nailcare-services-thumbnail.jpg",
      "price": 1000,
    },
  ];
  makeupServices = [
    {
      "name": "Facials",
      "image": "https://images.squarespace-cdn.com/content/v1/5d120265d1505c000195c9ab/1563004048906-01OLUMH7ZEPF1AXWUPMO/9509632741_d8e4c32522_b-810x539.jpg?format=1500w",
      "price": 1500,
    },
    {
      "name": "Cleanups",
      "image": "https://www.kamaayurveda.com/wp-content/uploads/2021/06/KAMA_July2019_InternalImage2_600x600.jpg",
      "price": 5000,
    },
    {
      "name": "Threading ",
      "image": "https://www.rd.com/wp-content/uploads/2016/10/01-simple-things-you-should-know-before-eyebrow-threading-26432987-dnberty.jpg",
      "price": 2000,
    },
  ];
  bridalDressingServices = [
    {
      "name": "Eastern",
      "image": "https://shaadiwish.com/blog/wp-content/uploads/2021/07/Angira-Dhar-bridal-saree-for-wedding.jpg",
      "price": 25000,
    },
    {
      "name": "Western",
      "image": "https://weddingsrilanka.lk/img_uploads/uploads/9571331588737014min.jpg",
      "price": 35000,
    },
    {
      "name": "Going Away",
      "image": "https://i.pinimg.com/236x/0d/6d/e4/0d6de46ffe3afecffea6b258a2076460.jpg",
      "price": 35000,
    },

  ];
  faceServices = [
    {
      "name": " ",
      "image": "https://www.askinclinic.co.uk/wp-content/uploads/2019/10/facial-woman-iStock_81310945_SMALL.jpg",
      "price": 10000,
    },
    {
      "name": " ",
      "image": "https://thumbs.dreamstime.com/b/beauty-woman-having-cosmetic-massage-facial-treatment-close-up-106638025.jpg",
      "price": 10000,
    },
    {
      "name": " ",
      "image": "https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg",
      "price": 10000,
    },

  ];
  hiringServices = [
    {
      "name": "Jwelleries ",
      "image": "https://thumbs.dreamstime.com/b/gold-jewelry-display-window-dubai-uae-dec-jewelleries-shop-bazaar-souk-139337179.jpg",
      "price": 10000,
    },
    {
      "name": "Sarees",
      "image": "https://ds393qgzrxwzn.cloudfront.net/resize/c700x700/cat1/img/images/0/kbRB6Vvr7I.jpg",
      "price": 5000,
    },
    {
      "name": "Frocks",
      "image": "https://stylesatlife.com/wp-content/uploads/2018/03/Pink-Strapless-Wedding-Frock.jpeg",
      "price": 2000,
    },
    {
      "name": "Bestman courts",
      "image": "https://media.istockphoto.com/id/182012526/photo/groom-with-best-man-and-groomsmen-at-wedding.jpg?s=612x612&w=0&k=20&c=U7pdXh7BLq89ILx6hAHSjrkYeobg4przBMH89cGEgwQ=",
      "price": 5000,
    },
    {
      "name": "Nilame",
      "image": "https://lankainformation.lk/media/com_mtree/images/listings/s/3592.jpg",
      "price": 15000,
    },
    {
      "name": "Flower girl & Bride maid costume",
      "image": "https://i.pinimg.com/736x/02/1d/86/021d865b6009e6116994c706c5874769.jpg",
      "price": 2000,
    },
    {
      "name": "Page Boy",
      "image": "https://onefabday.com/wp-content/uploads/2021/09/SS22-Boyswear-58.jpg",
      "price": 2000,
    },
  ];



  ngOnInit(): void {
    let n = sessionStorage.getItem("name");
    if (n) {
      this.name = n;
    }
    try {
      this.reviewService.getReviews().subscribe({
        next: data => {
          const r = data["c_reviews"];
          for (let review of r) {
            let rev: Review = {
              _id: review["_id"],
              name: review["name"],
              email: review["email"],
              review: review["review"],
              image_url: review["image_url"]
            }
            this.reviews.push(rev);
          }
        },
        error: error => {
          console.log(`get review request failed ${error}`)
        }
      })
      this.getItems();
      this.getAppointments();
    } catch (err) {
      console.log(`get reviews failed ${err}`)
    }

  }

  private pusherClient: Pusher;
  constructor(
    public authService: AuthServiceService,
    public router: Router,
    public reviewService: ReviewService,
    public appointmentService: AppointmentServiceService,
    public itemService: ItemServiceService,
    private modalService: NgbModal
  ) {
    this.pusherClient = new Pusher('bb7a644a42e95ce43874', { cluster: 'ap2' });
    const channel = this.pusherClient.subscribe('realtime-feeds');
    channel.bind(
      'posts',
      (data: { title: string; body: string; time: string }) => {

      }
    );
  }

  createAppointment(n: string, date: string, time: string, message: string, email: string, login: NgForm) {
    this.appointmentService.createAppointment(n, date, this.selectedTime, message, email).subscribe({
      next: data => {
        alert("Appointment placed successfully");

      },
      error: error => {
        alert("Appointment placed failed,try again");
        login.reset()
      }
    });

  }

  getItems() {
    this.itemService.getItems().subscribe({
      next: data => {
        let i = data["items"];
        for (var item of i) {
          const l: Item = {
            _id: item["_id"],
            name: item["name"],
            price: item["price"],
            description: item["description"],
            image_link: item["image_link"]
          }

          this.items.push(l);
        }
      },
      error: err => {
        console.log(`get items failed ${err}`)
      }
    })

  }

  addReview(review: string) {
    const email = sessionStorage.getItem("email");

    if (email) {
      this.reviewService.addReview(review)?.subscribe({
        next: data => {
          alert("Your review added succesfully");
          window.location.reload();
        },
        error: error => {
          console.log(`add review faied ${error}`);
          alert("Review adding failed,Please try again !");
        },
      });
    }
  }

  public signout() {
    this.authService.signout();
    window.location.reload()
  }

  public serviceNavigator(serviceType: string) {
    this.router.navigate(['auth']);
  }

  open(content: any, index: number) {
    this.activeList = [];
    switch (index) {
      case 1:
        this.activeTitle = "Hair"
        this.hairServices.forEach(value => this.activeList.push(value));
        break;
      case 2:
        this.activeTitle = "Predicure"
        this.predicureServices.forEach(value => this.activeList.push(value));
        break;
      case 3:
        this.activeTitle = "Manicure"
        this.manicureServices.forEach(value => this.activeList.push(value));
        break;
      case 4:
        this.activeTitle = "Makeup";
        this.makeupServices.forEach(value => this.activeList.push(value));
        break;
      case 5:
        this.activeTitle = "Bridal Dressing";
        this.bridalDressingServices.forEach(value => this.activeList.push(value));
        break;

      default:
        this.activeTitle = "Face";
        this.faceServices.forEach(value => this.activeList.push(value));
        break;
    }


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getAppointments() {
    this.appointments = [];
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        let a = data["appointments"];
        for (let i of a) {
          let appointment: Appointment = {
            _id: i["_id"],
            uid: i["uid"],
            date: i["date"],
            time: i["time"],
            message: i["message"],
            email: i["email"],
          }
          this.appointments.push(appointment);
        }
      },
      error: error => {
        console.log(`get apppontmetns failed ${error}`)
      }
    })
  }

  availableTimes(date: string): Array<string> {
    let availableTimes: Array<string> = [
      "08:00",
      //  "08:30",
      "09:00",
      // "09:30",
      "10:00",
      // "10:30",
      "11:00",
      // "11:30",
      "12:00",
      //  "12:30",
      "13:00",
      //  "13:30",
      "14:00",
      //  "14:30",
      "15:00",
      //  "15:30",
      "16:00",
      //  "16:30",
      "17:00",
      //  "17:30",
      "18:00",
      //  "18:30",
      "19:00",
      //  "19:30",
      "20:00",
    ];

    this.appointments.forEach((appointment) => {
      if (appointment.date === date) {
        availableTimes = availableTimes.filter(time => {
          return time !== appointment.time;
        })
      }
    })



    return availableTimes;
  }

  modelChanged() {
    this.shouldShowAvailableTimes = true;
  }

  onItemChange(value: any) {
    this.selectedTime = value.target.value;
  }
}
