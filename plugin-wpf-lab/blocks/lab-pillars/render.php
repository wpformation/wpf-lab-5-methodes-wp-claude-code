<?php
/**
 * Render template for wpf/lab-pillars.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$eyebrow   = isset( $attributes['eyebrow'] )  ? $attributes['eyebrow']  : '';
$title     = isset( $attributes['title'] )    ? $attributes['title']    : '';
$title_end = isset( $attributes['titleEnd'] ) ? $attributes['titleEnd'] : '';
$lead      = isset( $attributes['lead'] )     ? $attributes['lead']     : '';

$pillars = array(
    array(
        'variant' => 'acid',
        'name'    => isset( $attributes['p1Name'] ) ? $attributes['p1Name'] : '',
        'body'    => isset( $attributes['p1Body'] ) ? $attributes['p1Body'] : '',
    ),
    array(
        'variant' => 'paper',
        'name'    => isset( $attributes['p2Name'] ) ? $attributes['p2Name'] : '',
        'body'    => isset( $attributes['p2Body'] ) ? $attributes['p2Body'] : '',
    ),
    array(
        'variant' => 'violet',
        'name'    => isset( $attributes['p3Name'] ) ? $attributes['p3Name'] : '',
        'body'    => isset( $attributes['p3Body'] ) ? $attributes['p3Body'] : '',
    ),
    array(
        'variant' => 'paper',
        'name'    => isset( $attributes['p4Name'] ) ? $attributes['p4Name'] : '',
        'body'    => isset( $attributes['p4Body'] ) ? $attributes['p4Body'] : '',
    ),
);

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-pillars alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="wpf-lab-pillars__head">
        <div>
            <p class="wpf-lab-pillars__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
            <h2 class="wpf-lab-pillars__title"><?php echo esc_html( $title ); ?><br><?php echo esc_html( $title_end ); ?></h2>
        </div>
        <p class="wpf-lab-pillars__lead"><?php echo esc_html( $lead ); ?></p>
    </div>
    <div class="wpf-lab-pillars__grid">
        <?php foreach ( $pillars as $i => $p ) : $n = $i + 1; ?>
            <div class="wpf-lab-pillars__pillar wpf-lab-pillars__pillar--<?php echo esc_attr( $p['variant'] ); ?>">
                <div class="wpf-lab-pillars__pillar-head">
                    <p>PILIER · 0<?php echo $n; ?></p>
                    <p>0<?php echo $n; ?>/04</p>
                </div>
                <h3 class="wpf-lab-pillars__pillar-name"><?php echo esc_html( $p['name'] ); ?></h3>
                <p class="wpf-lab-pillars__pillar-body"><?php echo esc_html( $p['body'] ); ?></p>
                <p class="wpf-lab-pillars__pillar-weight">WEIGHT · 25%</p>
            </div>
        <?php endforeach; ?>
    </div>
</section>
