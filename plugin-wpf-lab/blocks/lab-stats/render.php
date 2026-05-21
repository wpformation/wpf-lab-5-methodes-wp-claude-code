<?php
/**
 * Render template for wpf/lab-stats.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$cells = array();
for ( $i = 1; $i <= 4; $i++ ) {
    $cells[] = array(
        'kpi'   => sprintf( '%02d · KPI', $i ),
        'value' => isset( $attributes[ "kpi{$i}Value" ] ) ? $attributes[ "kpi{$i}Value" ] : '',
        'label' => isset( $attributes[ "kpi{$i}Label" ] ) ? $attributes[ "kpi{$i}Label" ] : '',
        'violet' => ( 2 === $i ),
    );
}

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-stats alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="wpf-lab-stats__grid">
        <?php foreach ( $cells as $cell ) : ?>
            <div class="wpf-lab-stats__cell <?php echo $cell['violet'] ? 'wpf-lab-stats__cell--violet' : ''; ?>">
                <p class="wpf-lab-stats__kpi"><?php echo esc_html( $cell['kpi'] ); ?></p>
                <h2 class="wpf-lab-stats__value"><?php echo esc_html( $cell['value'] ); ?></h2>
                <p class="wpf-lab-stats__label"><?php echo esc_html( $cell['label'] ); ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>
