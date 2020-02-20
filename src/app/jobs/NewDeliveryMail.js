import Mail from '../../lib/Mail';

class NewDeliveryMail {
  // get property() -> allows call this property directly (without call a method)
  get key() {
    return 'NewDeliveryMail'; // each job needs a unique key
  }

  /**
   * job to be executed when this proccess is called
   * if proccess is about send 10 emails, this method will be excecuted 10 times
   */
  async handle({ data }) {
    const { deliveryman, recipient, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda!',
      template: 'newDelivery',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product,
      },
    });
  }
}

export default new NewDeliveryMail();
