<?php
/**
 * Render template for wpf/lab-utility.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$brand = isset( $attributes['brandBadge'] ) ? $attributes['brandBadge'] : 'WPF/LAB';
$l1    = isset( $attributes['leftItem1'] )  ? $attributes['leftItem1']  : '';
$l2    = isset( $attributes['leftItem2'] )  ? $attributes['leftItem2']  : '';
$l3    = isset( $attributes['leftItem3'] )  ? $attributes['leftItem3']  : '';
$r1    = isset( $attributes['rightItem1'] ) ? $attributes['rightItem1'] : '';
$r2    = isset( $attributes['rightItem2'] ) ? $attributes['rightItem2'] : '';
$r3    = isset( $attributes['rightItem3'] ) ? $attributes['rightItem3'] : '';

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-utility alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="wpf-lab-utility__row">
        <div class="wpf-lab-utility__group wpf-lab-utility__group--left">
            <span class="wpf-lab-utility__brand"><?php echo esc_html( $brand ); ?></span>
            <?php if ( $l1 ) : ?><span class="wpf-lab-utility__item"><?php echo esc_html( $l1 ); ?></span><?php endif; ?>
            <?php if ( $l2 ) : ?><span class="wpf-lab-utility__item"><?php echo esc_html( $l2 ); ?></span><?php endif; ?>
            <?php if ( $l3 ) : ?><span class="wpf-lab-utility__item"><?php echo esc_html( $l3 ); ?></span><?php endif; ?>
        </div>
        <div class="wpf-lab-utility__group wpf-lab-utility__group--right">
            <?php if ( $r1 ) : ?><span class="wpf-lab-utility__item"><?php echo esc_html( $r1 ); ?></span><?php endif; ?>
            <?php if ( $r2 ) : ?><span class="wpf-lab-utility__item"><?php echo esc_html( $r2 ); ?></span><?php endif; ?>
            <?php if ( $r3 ) : ?><span class="wpf-lab-utility__item"><?php echo esc_html( $r3 ); ?></span><?php endif; ?>
        </div>
    </div>
</section>
